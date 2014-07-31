SubGit Documentation Markdown
===================================

Each Chapter .md file must start from following YAML header:

\-\-\-<br>
layout: default (always stays *default*)<br>
title: "Chapter title" (a copy of chapter title, it is important to put the title in quotes)<br>
category: chapter / subchapter (use *chapter* for main chapters and *subchapter* for subchapters like 3.1)<br>
weight: 1 (a unique number to each chapter file)<br>
\-\-\-

Chapter title prefix - \#\#Chapter 1. Overview

Subchapter title prefix - \#\#\#Chapter 5.1. Installation Stages

Figure titles or any bold text must be wrapped in double asterisks - \*\*strong or bold\*\*

Italic or emphasized text must be wrapped in single asterisks - \*italic or emphasized\*

Optionally any word can be wrapped into \[\] followed by (high) element. In example a middle word would be highlighted. Normal [highlighted](high) normal.

To insert an image use this \!\[alt text\]\(\{\{ site.baseurl \}\}/img/image_name.png\) where you can change only "alt text" which is the text to be inserted into alt="" attribute of an image tag and "/img/image_name.png" which is a file path and name of desired image.

Each paragraph starts with just a new line.

Unordered list are created by a block of lines starting with "+" symbol followed by a single space:

\+ Item one<br>
\+ Item two<br>
\+ Item n<br>

To create a clickable email address, simply put it into angle brackets like this \<example@domain.com\>

URLs have following format [click here](http://click.here.com) or you can just wrap the link into angle brackets if the text and destination are the same. Thus \<http://domain.com\> would create \<a href="http://domain.com"\>http://domain.com\</a\>

Except for the blocks of code, use underscore symbol with backslash: SVN\_PATH > SVN\\\_PATH

When you want to insert a <br /> using Markdown, you end a line with two or more spaces, then type return.

Markdown provides backslash escapes for the following characters:

\\   backslash  
\`   backtick  
\*   asterisk  
\_   underscore  
\{\}  curly braces  
\[\]  square brackets  
\(\)  parentheses  
\#   hash mark  
\+   plus sign  
\-   minus sign (hyphen)  
\.   dot  
\!   exclamation mark

Enjoy! :)