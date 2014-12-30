import pdfkit

body = """
    <html>
      <head>
        <meta name="pdfkit-page-size" content="Legal"/>
        <meta name="pdfkit-orientation" content="Landscape"/>
      </head>
      <body>
        Hello
      </body>
      </html>
    """

options = {
    'margin-top': '0.75in',
    'margin-right': '0.75in',
    'margin-bottom': '0.75in',
    'margin-left': '0.75in',
    'encoding': "UTF-8",
    'print-media-type': '',
    'no-outline': None,
    'dpi': 300
}

# Multiple CSS files
# css = ['css/print2.min.css']
# pdfkit.from_string(body, 'out.pdf', options=options, css=css)
pdfkit.from_file('index.html', 'output.pdf', options=options)
