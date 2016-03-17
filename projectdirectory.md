---
layout: page
title: Project Directory
---

I'm testing this out.

Hello world.

{% for post in site.posts %}{{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})  
{% endfor %}