#!/usr/bin/env python3
"""Collect an HTML baseline. This is not a browser or a performance audit."""

import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lang = None
        self.title = []
        self.metadata = {}
        self.headings = []
        self.links = []
        self.buttons = []
        self.images = []
        self.form_count = 0
        self._captures = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            self.lang = attrs.get('lang')
        elif tag == 'meta':
            key = attrs.get('name') or attrs.get('property')
            if key:
                self.metadata[key] = attrs.get('content', '')
        elif tag == 'img':
            self.images.append({'src': attrs.get('src'), 'alt': attrs.get('alt')})
        elif tag == 'form':
            self.form_count += 1
        if tag == 'title' or tag in ('h1', 'h2', 'h3', 'a', 'button'):
            self._captures.append({'tag': tag, 'parts': [], 'attrs': attrs})

    def handle_data(self, data):
        for capture in self._captures:
            capture['parts'].append(data)

    def handle_endtag(self, tag):
        for index in range(len(self._captures) - 1, -1, -1):
            if self._captures[index]['tag'] != tag:
                continue
            capture = self._captures.pop(index)
            text = ' '.join(''.join(capture['parts']).split())
            if tag == 'title':
                self.title.append(text)
            elif tag in ('h1', 'h2', 'h3'):
                self.headings.append({'level': tag, 'text': text})
            elif tag == 'a':
                self.links.append({'text': text, 'href': capture['attrs'].get('href')})
            elif tag == 'button':
                self.buttons.append(text)
            break

    def report(self):
        return {
            'lang': self.lang,
            'title': ' '.join(self.title),
            'metadata': self.metadata,
            'headings': self.headings,
            'links': self.links,
            'buttons': self.buttons,
            'forms': self.form_count,
            'images': self.images,
            'images_without_alt_attribute': sum(image['alt'] is None for image in self.images),
            'limitations': 'HTML only; JavaScript rendering, visual layout, keyboard behavior, user testing and Core Web Vitals are not assessed.',
        }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('url', nargs='?', default='https://luna.nodesk.tech/')
    parser.add_argument('--file', type=Path, help='Inspect a local UTF-8 HTML file instead of fetching a URL')
    parser.add_argument('--output', type=Path, help='Write JSON to a file instead of stdout')
    args = parser.parse_args()
    page = PageParser()
    try:
        if args.file:
            html = args.file.read_text(encoding='utf-8')
            evidence = {'source_file': str(args.file)}
        else:
            if urlparse(args.url).scheme not in ('http', 'https'):
                parser.error('URL must use http or https')
            started = time.monotonic()
            request = Request(args.url, headers={'User-Agent': 'addapaw-site-review/0.1'})
            with urlopen(request, timeout=30) as response:
                content_type = response.headers.get_content_type()
                if content_type != 'text/html':
                    raise ValueError(f'Expected text/html, received {content_type}')
                html = response.read().decode(response.headers.get_content_charset() or 'utf-8')
                evidence = {
                    'requested_url': args.url,
                    'final_url': response.url,
                    'http_status': response.status,
                    'fetch_seconds': round(time.monotonic() - started, 3),
                    'fetch_timing_note': 'One proxy-mediated request, not a browser performance measurement.',
                }
        page.feed(html)
        page.close()
    except (OSError, ValueError, HTTPError, URLError) as error:
        print(f'Inspection failed: {error}', file=sys.stderr)
        return 1
    report = json.dumps({**evidence, **page.report()}, ensure_ascii=False, indent=2) + '\n'
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(report, encoding='utf-8')
        print(f'Wrote {args.output}')
    else:
        print(report, end='')
    return 0


if __name__ == '__main__':
    sys.exit(main())
