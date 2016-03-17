---
layout: page
title: Project Directory
---

I'm testing this out.

Hello world.

{% for project in site.projects %}{{ project.date | date_to_string }} &raquo; [ {{ project.title }} ]({{ project.url }})  
{% endfor %}