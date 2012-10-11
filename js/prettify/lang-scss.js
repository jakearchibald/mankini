/**
 * @preserve Copyright (C) 2009 Google Inc.
 * Copyright (C) 2011 Kyo Nagashima <kyo@hail2u.net>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * @fileoverview
 * Registers a language handler for SCSS (sassy CSS).
 *
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-scss"></pre>
 *
 *
 * This language handler mostly based on CSS language handler
 * http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-css.js
 *
 * @author kyo@haiil2u.net
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
            // The space production <s>
            [PR['PR_PLAIN'], /^[ \t\r\n\f]+/, null, ' \t\r\n\f']
        ],
        [
            // Quoted strings.  <string1> and <string2>
            [PR['PR_STRING'], /^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/, null],
            [PR['PR_STRING'], /^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/, null],
            ['lang-scss-str', /^url\(([^\)\"\']*)\)/i],
            [PR['PR_KEYWORD'], /^(?:url|rgba?|hsla?|\!important|@import|@page|@media|@charset|inherit|abs|adjust-color|adjust-hue|alpha|ceil|change-color|comparable|complement|darken|desaturate|fade-in|fade-out|floor|grayscale|hue|invert|join|length|lighten|lightness|mix|nth|opacity|percentage|quote|round|saturate|saturation|scale-color|transparentize|type-of|unit|unitless|unquote|!default)(?=[^\-\w]|$)/i, null],
            // A property name -- an identifier followed by a colon.
            ['lang-scss-kw', /^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*:/i],
            // A C style block comment.  The <comment> production.
            [PR['PR_COMMENT'], /^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],
            // A C style line comment.
            [PR['PR_COMMENT'], /^\/\/[^\r\n]*/, null],
            // Escaping text spans
            // [PR['PR_COMMENT'], /^(?:<!--|-->)/],
            // A number possibly containing a suffix.
            [PR['PR_LITERAL'], /^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],
            // A SASS MIXIN FILTER
            [PR['PR_TYPE'], /^(\@mixin [0-9a-zA-Z-]+)|(\@include [a-zA-Z0-9-]+)|(\+[0-9a-zA-Z-]+)|(@extend|@debug|@warn|@if|@else( if)?|@for|@each|@while|@function|@return|@content|through|from)/],
            // A VARIABLE FILTER
            [PR['PR_DECLARATION'], /^\$[0-9a-zA-Z-]+/],
            // A SELECTOR FILTER
            [PR['PR_SOURCE'], /^((\.[a-zA-Z-][a-zA-Z0-9-]+)(:[0-9a-zA-Z-]+)?)|((\#[a-zA-Z-][a-zA-Z0-9-]+)(:[0-9a-zA-Z-]+)?)|(\%[a-zA-Z-][a-zA-Z0-9-]+)|((\&\.([a-zA-Z0-9-]+))|(\&:([a-zA-Z0-9-]+)))/],
            // A ATTRIBUTE FILTER
            [PR['PR_ATTRIB_VALUE'], /^[a-zA-Z-]*\:\s/],
            // A hex color
            [PR['PR_LITERAL'], /^#(?:[0-9a-f]{3}){1,2}/i],
            // Interpolation syntax: #{...}
            [PR['PR_LITERAL'], /^#{.*?}/],
            // Parental reference: &
            [PR['PR_LITERAL'], /^&/],
            // An identifier
            [PR['PR_PLAIN'], /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],
            // An SCSS variable (for preventing keyword highlihting)
            [PR['PR_PLAIN'], /^\$?-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],
            // A run of punctuation
            [PR['PR_PUNCTUATION'], /^[^\s\w\'\"#{}$]+/]
        ]
    ),
    ['scss']
);

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [],
        [
            [PR['PR_KEYWORD'], /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i]
        ]
    ),
    ['scss-kw']
);

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [],
        [
            [PR['PR_STRING'], /^[^\)\"\']+/]
        ]
    ),
    ['scss-str']
);