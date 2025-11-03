# Reflection

## Author
**Kailine Lima**

### Overview

This debugging exercise helped me understand how to identify, isolate, and
fix logical and syntax errors in a real-world JavaScript project that fetches 
data from an external API (City of Winnipeg’s Open Data portal). Through using 
the browser’s debugger and console, I learned how to trace variable values, 
inspect API requests, and validate program flow step by step.

### What I Discovered

**1.Understanding the Problem Flow**
- Initially, the program returned several errors such as “TypeError: keyword
is undefined” and “HTTP 400 Bad Request”.
- Using breakpoints and console logs, I learned that the main issue was caused 
by invalid variable handling — the input field value was not properly passed 
to the fetch function.

**2.Learning from Each Error**
- The $where clause was incorrect and treated as a function call 
instead of a text string.
- The keyword variable was undefined, causing .trim() to fail.
- The API received malformed requests because the HTML input element itself was
being sent instead of its .value.
- These stages showed how small logic mistakes can lead to major request errors
and helped me practice isolating one issue at a time.

### Final Reflection

This project strengthened my understanding of how asynchronous functions, 
query strings, and browser debugging tools work together. It also improved. 
my problem-solving mindset: rather than guessing, I now systematically check. 
values, logic, and program flow. Finally, the program successfully fetched and
displayed data without console errors. 
However, I spend too much time finding the correct API that works. The major link
didn't work and didn't give the data correctly. Then I struggled with $Where, I 
I tried to apply via the link, but regardless of what I did, I couldn't succeed.
In conclusion, this is my first time I worked with JavaScript async and I enjoy 
doing that. 