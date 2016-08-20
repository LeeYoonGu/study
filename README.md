<!-- h1-h6 -->
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

<!-- Alternative syntax for h1-h2 -->
Heading 1
=========
Heading 2
---------

Separating your text by blank lines,

is going to make them paragraphs.

What about line breaks then ?  
For line breaks just append the previous sentence with 2 spaces.

> Is there any syntax for blockquotes ?

> Sure there is :)

What about unordered lists ? Just start your sentences with an:

* Asterisk
+ Plus
	or
- Hyphen

And ordered lists ? Simple:

1. One
2. Two
3. Three

Can I have paragraphs and blockquotes inside list items ? Sure:

* First Paragraph

	Inner Paragraph

* Second paragraph
	> blockquotes

Basically you'll have to indent your inner paragraphs, blockquotes, etc. by 4 spaces or 1 tab.

I am a web developer, so I want to have code blocks. Here it is then, just indent every line of code by 4 spaces or 1 tab:

	body {
		margin: 0; padding: 0;
	}

That code is now wrapped inside `<pre><code></code></pre>`. Did you just notice something ? You wrote inline code with markdown! Also notice your angular brackets got converted into their respective HTML entities. Nice!

What about putting some emphasis on my text ?

*single asterisk*  
_single underscore_

You just wrapper your text in `<em>` tags.

**double asterisk**  
__double underscore__

You just used `<strong>` tags.

Just incase you want to produce literal asterisk or underscore, then escape them like this \* and \_.

What's the syntax for anchor and image tags ?

There are 2 syntax for image tags:
Inline Syntax:

![Alt Text](http://lorempixel.com/output/nature-q-c-100-100-8.jpg "Some title")

Reference-Style Syntax:

![Alt Text][id]

[id]: http://lorempixel.com/output/nature-q-c-100-100-8.jpg "Some Title"

Hey! It's the same with links:

[CSSDeck](http://cssdeck.com "Collection of CSS and JS Creations")

[CSSDeck][link_to_cssdeck]  

[link_to_cssdeck]: http://cssdeck.com "Learn HTML5, CSS and JS in a new way!"

Can I have automatic links ? Sure:

<http://cssdeck.com>  
<hello@cssdeck.com>


That's all guys. Don't forget that you can still use HTML tags. For example: <span>Hello</span>
	
Also check out the official Markdown Documentation - <http://daringfireball.net/projects/markdown/syntax>








