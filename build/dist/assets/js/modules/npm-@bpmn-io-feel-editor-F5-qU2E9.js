import{a as N,c as _,s as J}from"./npm-@codemirror-autocomplete-BQU296tH.js";import{d as D}from"./npm-@codemirror-commands-DeeElJLW.js";import{s as M,H as V,b as G,i as K,a as T}from"./npm-@codemirror-language-Cp45Pv10.js";import{l as Y,s as W}from"./npm-@codemirror-lint-tlgSyICZ.js";import{F as b,E as Z,C as R}from"./npm-@codemirror-state-Df8Tw2ku.js";import{E as u,t as U,k as X,p as k}from"./npm-@codemirror-view-BGOifzDV.js";import{c as Q}from"./npm-@bpmn-io-feel-lint-o_JHLSx3.js";import{t as i}from"./npm-@lezer-highlight-YY5Sg9D5.js";import{s as ee,a as ne,k as te,f as oe}from"./npm-lang-feel-C93aHwbz.js";import{d as se}from"./npm-min-dom-Bq-NsQKJ.js";var ae=[Y(Q())];const re=u.theme({"& .cm-content":{padding:"0px"},"& .cm-line":{padding:"0px"},"&.cm-editor.cm-focused":{outline:"none"},"& .cm-completionInfo":{whiteSpace:"pre-wrap",overflow:"hidden",textOverflow:"ellipsis"},"& .cm-completionInfo > *":{whiteSpace:"normal"},"& .cm-completionInfo ul":{margin:0,paddingLeft:"15px"},"& .cm-completionInfo pre":{marginBottom:0,whiteSpace:"pre-wrap"},"& .cm-completionInfo p":{marginTop:0},"& .cm-completionInfo p:not(:last-of-type)":{marginBottom:0}}),ie=u.baseTheme({"& .variableName":{color:"#10f"},"& .number":{color:"#164"},"& .string":{color:"#a11"},"& .bool":{color:"#219"},"& .function":{color:"#aa3731",fontWeight:"bold"},"& .control":{color:"#708"}}),pe=M(V.define([{tag:i.variableName,class:"variableName"},{tag:i.name,class:"variableName"},{tag:i.number,class:"number"},{tag:i.string,class:"string"},{tag:i.bool,class:"bool"},{tag:i.function(i.variableName),class:"function"},{tag:i.function(i.special(i.variableName)),class:"function"},{tag:i.controlKeyword,class:"control"},{tag:i.operatorKeyword,class:"control"}]));var ce=[re,ie,pe];function F(e){return e&&e.from===e.to}function le(e,t){const n=e.nextSibling;return F(e)||n&&n.from===t&&F(n)}function ue(e){return e&&e.parent&&e.parent.name==="VariableName"}function x(e){return e?e.name==="PathExpression"?!0:x(e.parent):!1}function ge({variables:e}){return t=>{const n=T(t.state).resolve(t.pos,-1);if(!x(n))return;const o=de(n),s=n===o?t.pos:n.from,p=v(o,t);let a=e;for(var c=0;c<p.length-1;c++){var l=a.find(r=>r.name===p[c].name);if(!l)return null;if(l.isList!=="optional"&&!!l.isList!==p[c].isList)return;a=l.entries}return a?(a=a.map(r=>({label:r.name,type:"variable",info:r.info,detail:r.detail})),{from:s,options:a}):void 0}}function de(e){for(;e;){if(e.name==="PathExpression")return e;e=e.parent}}function v(e,t){let n=[];for(let o=e.firstChild;o;o=o.nextSibling)o.name==="PathExpression"?n.push(...v(o,t)):o.name==="FilterExpression"?n.push(...me(o,t)):n.push({name:A(o,t),isList:!1});return n}function me(e,t){const n=e.firstChild;if(n.name==="PathExpression"){const o=v(n,t),s=o[o.length-1];return s.isList=!0,o}return[{name:A(n,t),isList:!0}]}function A(e,t){return t.state.sliceDoc(e.from,e.to)}function fe({variables:e=[],builtins:t=[]}){const n=he(e,t);return n.length?o=>{const{pos:s,state:p}=o,a=T(p).resolve(s,-1);return le(a,s)?o.explicit?{from:s,options:n}:null:!ue(a)||x(a)?null:{from:a.from,options:n}}:o=>null}function he(e,t){return[].concat(e.map(n=>w(n)),t.map(n=>w(n)))}function w(e,t){return e.type==="function"?qe(e,t):{label:e.name,type:"variable",info:e.info,detail:e.detail,boost:t}}function qe(e,t){const{name:n,info:o,detail:s,params:p=[]}=e,a=p.map(({name:r,type:g},q)=>({name:r||`param ${q+1}`,type:g})),c=`${n}(${a.map(r=>"${"+r.name+"}").join(", ")})`,l=a.map(({name:r,type:g})=>g?`${r}: ${g}`:r).join(", "),f=`${n}(${l})`;return J(c,{label:f,type:"function",info:o,detail:s,boost:t})}function be({variables:e=[],builtins:t=[]}){return[ge({variables:e}),fe({variables:e,builtins:t}),ee(ne.map(n=>({...n,boost:-1}))),...te]}function xe(e){return oe(e)}function ve(e,t){return e.slice().reverse().reduce((n,o)=>(n[o.name]=new Function,n),{})}const j=b.define(),C=b.define(),I=b.define();function S({dialect:e="expression",variables:t=[],builtins:n=[],completions:o=be({builtins:n,variables:t})}){const s=ve([...t,...n]);return[I.of(e),j.of(n),C.of(t),xe({dialect:e,context:s,completions:o})]}function ye(e){const t=e.facet(j)[0],n=e.facet(C)[0],o=e.facet(I)[0];return{builtins:t,variables:n,dialect:o}}var Ee=[{name:"not(negand)",description:`<p>Returns the logical negation of the given value.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">not(negand: boolean): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">not(true)
// false

not(null)
// null
</code></pre>
`},{name:"is defined(value)",description:`<p><em>Camunda Extension</em></p>
<p>Checks if a given value is not <code>null</code>. If the value is <code>null</code> then the function returns <code>false</code>.
Otherwise, the function returns <code>true</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">is defined(value: Any): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">is defined(1)
// true

is defined(null)
// false

is defined(x)
// false - if no variable &quot;x&quot; exists

is defined(x.y)
// false - if no variable &quot;x&quot; exists or it doesn&#39;t have a property &quot;y&quot;
</code></pre>
<p>:::caution Breaking change</p>
<p>This function worked differently in previous versions. It returned <code>true</code> if the value was <code>null</code>.
Since this version, the function returns <code>false</code> if the value is <code>null</code>.</p>
<p>:::</p>
`},{name:"get or else(value, default)",description:`<p><em>Camunda Extension</em></p>
<p>Return the provided value parameter if not <code>null</code>, otherwise return the default parameter</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">get or else(value: Any, default: Any): Any
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">get or else(&quot;this&quot;, &quot;default&quot;)
// &quot;this&quot;

get or else(null, &quot;default&quot;)
// &quot;default&quot;

get or else(null, null)
// null
</code></pre>
`},{name:"assert(value, condition)",description:`<p><em>Camunda Extension</em></p>
<p>Verify that the given condition is met. If the condition is <code>true</code>, the function returns the value.
Otherwise, the evaluation fails with an error.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">assert(value: Any, condition: Any)
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">assert(x, x != null)
// &quot;value&quot; - if x is &quot;value&quot;
// error - if x is null or doesn&#39;t exist

assert(x, x &gt;= 0)
// 4 - if x is 4
// error - if x is less than zero
</code></pre>
`},{name:"assert(value, condition, cause)",description:`<p><em>Camunda Extension</em></p>
<p>Verify that the given condition is met. If the condition is <code>true</code>, the function returns the value.
Otherwise, the evaluation fails with an error containing the given message.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">assert(value: Any, condition: Any, cause: String)
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">assert(x, x != null, &quot;&#39;x&#39; should not be null&quot;)
// &quot;value&quot; - if x is &quot;value&quot;
// error(&#39;x&#39; should not be null) - if x is null or doesn&#39;t exist

assert(x, x &gt;= 0, &quot;&#39;x&#39; should be positive&quot;)
// 4 - if x is 4
// error(&#39;x&#39; should be positive) - if x is less than zero
</code></pre>
`},{name:"get value(context, key)",description:`<p>Returns the value of the context entry with the given key.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">get value(context: context, key: string): Any
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">get value({foo: 123}, &quot;foo&quot;)
// 123

get value({a: 1}, &quot;b&quot;)
// null
</code></pre>
`},{name:"get value(context, keys)",description:`<p><em>Camunda Extension</em></p>
<p>Returns the value of the context entry for a context path defined by the given keys.</p>
<p>If <code>keys</code> contains the keys <code>[k1, k2]</code> then it returns the value at the nested entry <code>k1.k2</code> of the context.</p>
<p>If <code>keys</code> are empty or the nested entry defined by the keys doesn&#39;t exist in the context, it returns <code>null</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">get value(context: context, keys: list&lt;string&gt;): Any
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">get value({x:1, y: {z:0}}, [&quot;y&quot;, &quot;z&quot;])
// 0

get value({x: {y: {z:0}}}, [&quot;x&quot;, &quot;y&quot;])
// {z:0}

get value({a: {b: 3}}, [&quot;b&quot;])
// null
</code></pre>
`},{name:"get entries(context)",description:`<p>Returns the entries of the context as a list of key-value-pairs.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">get entries(context: context): list&lt;context&gt;
</code></pre>
<p>The return value is a list of contexts. Each context contains two entries for &quot;key&quot; and &quot;value&quot;.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">get entries({foo: 123})
// [{key: &quot;foo&quot;, value: 123}]
</code></pre>
`},{name:"context put(context, key, value)",description:`<p>Adds a new entry with the given key and value to the context. Returns a new context that includes the entry.</p>
<p>If an entry for the same key already exists in the context, it overrides the value.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">context put(context: context, key: string, value: Any): context
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">context put({x:1}, &quot;y&quot;, 2)
// {x:1, y:2}
</code></pre>
<p>:::info
The function <code>context put()</code> replaced the previous function <code>put()</code> (Camunda Extension). The
previous function is deprecated and should not be used anymore.
:::</p>
`},{name:"context put(context, keys, value)",description:`<p>Adds a new entry with the given value to the context. The path of the entry is defined by the keys. Returns a new context that includes the entry.</p>
<p>If <code>keys</code> contains the keys <code>[k1, k2]</code> then it adds the nested entry <code>k1.k2 = value</code> to the context.</p>
<p>If an entry for the same keys already exists in the context, it overrides the value.</p>
<p>If <code>keys</code> are empty, it returns <code>null</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">context put(context: context, keys: list&lt;string&gt;, value: Any): context
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">context put({x:1}, [&quot;y&quot;], 2)
// {x:1, y:2}

context put({x:1, y: {z:0}}, [&quot;y&quot;, &quot;z&quot;], 2)
// {x:1, y: {z:2}}

context put({x:1}, [&quot;y&quot;, &quot;z&quot;], 2)
// {x:1, y: {z:2}}
</code></pre>
`},{name:"context merge(contexts)",description:`<p>Union the given contexts. Returns a new context that includes all entries of the given contexts.</p>
<p>If an entry for the same key already exists in a context, it overrides the value. The entries are overridden in the same order as in the list of contexts.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">context merge(contexts: list&lt;context&gt;): context
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">context merge([{x:1}, {y:2}])
// {x:1, y:2}

context merge([{x:1, y: 0}, {y:2}])
// {x:1, y:2}
</code></pre>
<p>:::info
The function <code>context merge()</code> replaced the previous function <code>put all()</code> (Camunda Extension). The
previous function is deprecated and should not be used anymore.
:::</p>
`},{name:"string(from)",description:`<p>Returns the given value as a string representation.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">string(from: Any): string
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">string(1.1)
// &quot;1.1&quot;

string(date(&quot;2012-12-25&quot;))
// &quot;2012-12-25&quot;
</code></pre>
`},{name:"number(from)",description:`<p>Parses the given string to a number.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">number(from: string): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">number(&quot;1500.5&quot;)
// 1500.5
</code></pre>
`},{name:"context(entries)",description:`<p>Constructs a context of the given list of key-value pairs. It is the reverse function to <a href="feel-built-in-functions-context.md#get-entriescontext">get entries()</a>.</p>
<p>Each key-value pair must be a context with two entries: <code>key</code> and <code>value</code>. The entry with name <code>key</code> must have a value of the type <code>string</code>.</p>
<p>It might override context entries if the keys are equal. The entries are overridden in the same order as the contexts in the given list.</p>
<p>Returns <code>null</code> if one of the entries is not a context or if a context doesn&#39;t contain the required entries.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">context(entries: list&lt;context&gt;): context
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">context([{&quot;key&quot;:&quot;a&quot;, &quot;value&quot;:1}, {&quot;key&quot;:&quot;b&quot;, &quot;value&quot;:2}])
// {a:1, b:2}
</code></pre>
`},{name:"date(from)",description:`<p>Returns a date from the given value.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">date(from: string): date
</code></pre>
<p>Parses the given string into a date.</p>
<pre><code class="language-feel">date(from: date and time): date
</code></pre>
<p>Extracts the date component from the given date and time.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">date(&quot;2018-04-29&quot;)
// date(&quot;2018-04-29&quot;)

date(date and time(&quot;2012-12-25T11:00:00&quot;))
// date(&quot;2012-12-25&quot;)
</code></pre>
`},{name:"date(year, month, day)",description:`<p>Returns a date from the given components.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">date(year: number, month: number, day: number): date
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">date(2012, 12, 25)
// date(&quot;2012-12-25&quot;)
</code></pre>
`},{name:"time(from)",description:`<p>Returns a time from the given value.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">time(from: string): time
</code></pre>
<p>Parses the given string into a time.</p>
<pre><code class="language-feel">time(from: date and time): time
</code></pre>
<p>Extracts the time component from the given date and time.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">time(&quot;12:00:00&quot;)
// time(&quot;12:00:00&quot;)

time(date and time(&quot;2012-12-25T11:00:00&quot;))
// time(&quot;11:00:00&quot;)
</code></pre>
`},{name:"time(hour, minute, second)",description:`<p>Returns a time from the given components.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">time(hour: number, minute: number, second: number): time
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">time(23, 59, 0)
// time(&quot;23:59:00&quot;)
</code></pre>
`},{name:"time(hour, minute, second, offset)",description:`<p>Returns a time from the given components, including a timezone offset.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">time(hour: number, minute: number, second: number, offset: days and time duration): time
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">time(14, 30, 0, duration(&quot;PT1H&quot;))
// time(&quot;14:30:00+01:00&quot;)
</code></pre>
`},{name:"date and time(from)",description:`<p>Parses the given string into a date and time.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">date and time(from: string): date and time
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">date and time(&quot;2018-04-29T09:30:00&quot;)
// date and time(&quot;2018-04-29T09:30:00&quot;)
</code></pre>
`},{name:"date and time(date, time)",description:`<p>Returns a date and time from the given components.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">date and time(date: date, time: time): date and time
</code></pre>
<pre><code class="language-feel">date and time(date: date and time, time: time): date and time
</code></pre>
<p>Returns a date and time value that consists of the date component of <code>date</code> combined with <code>time</code>.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">date and time(date(&quot;2012-12-24&quot;),time(&quot;T23:59:00&quot;))
// date and time(&quot;2012-12-24T23:59:00&quot;)

date and time(date and time(&quot;2012-12-25T11:00:00&quot;),time(&quot;T23:59:00&quot;))
// date and time(&quot;2012-12-25T23:59:00&quot;)
</code></pre>
`},{name:"date and time(date, timezone)",description:`<p><em>Camunda Extension</em></p>
<p>Returns the given date and time value at the given timezone.</p>
<p>If <code>date</code> has a different timezone than <code>timezone</code> then it adjusts the time to match the local time of <code>timezone</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">date and time(date: date and time, timezone: string): date and time
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">date and time(@&quot;2020-07-31T14:27:30@Europe/Berlin&quot;, &quot;America/Los_Angeles&quot;)
// date and time(&quot;2020-07-31T05:27:30@America/Los_Angeles&quot;)

date and time(@&quot;2020-07-31T14:27:30&quot;, &quot;Z&quot;)
// date and time(&quot;2020-07-31T12:27:30Z&quot;)
</code></pre>
`},{name:"duration(from)",description:`<p>Parses the given string into a duration. The duration is either a days and time duration or a years and months duration.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">duration(from: string): days and time duration
</code></pre>
<pre><code class="language-feel">duration(from: string): years and months duration
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">duration(&quot;P5D&quot;)
// duration(&quot;P5D&quot;)

duration(&quot;P32Y&quot;)
// duration(&quot;P32Y&quot;)
</code></pre>
`},{name:"years and months duration(from, to)",description:`<p>Returns the years and months duration between <code>from</code> and <code>to</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">years and months duration(from: date, to: date): years and months duration
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">years and months duration(date(&quot;2011-12-22&quot;), date(&quot;2013-08-24&quot;))
// duration(&quot;P1Y8M&quot;)
</code></pre>
`},{name:"list contains(list, element)",description:`<p>Returns <code>true</code> if the given list contains the element. Otherwise, returns <code>false</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">list contains(list: list, element: Any): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">list contains([1,2,3], 2)
// true
</code></pre>
`},{name:"count(list)",description:`<p>Returns the number of elements of the given list.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">count(list: list): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">count([1,2,3])
// 3
</code></pre>
`},{name:"min(list)",description:`<p>Returns the minimum of the given list.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">min(list: list): Any
</code></pre>
<p>All elements in <code>list</code> should have the same type and be comparable.</p>
<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">min([1,2,3])
// 1

min(1,2,3)
// 1
</code></pre>
`},{name:"max(list)",description:`<p>Returns the maximum of the given list.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">max(list: list): Any
</code></pre>
<p>All elements in <code>list</code> should have the same type and be comparable.</p>
<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">max([1,2,3])
// 3

max(1,2,3)
// 3
</code></pre>
`},{name:"sum(list)",description:`<p>Returns the sum of the given list of numbers.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">sum(list: list&lt;number&gt;): number
</code></pre>
<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">sum([1,2,3])
// 6

sum(1,2,3)
// 6
</code></pre>
`},{name:"product(list)",description:`<p>Returns the product of the given list of numbers.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">product(list: list&lt;number&gt;): number
</code></pre>
<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">product([2, 3, 4])
// 24

product(2, 3, 4)
// 24
</code></pre>
`},{name:"mean(list)",description:`<p>Returns the arithmetic mean (i.e. average) of the given list of numbers.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">mean(list: list&lt;number&gt;): number
</code></pre>
<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">mean([1,2,3])
// 2

mean(1,2,3)
// 2
</code></pre>
`},{name:"median(list)",description:`<p>Returns the median element of the given list of numbers.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">median(list: list&lt;number&gt;): number
</code></pre>
<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">median(8, 2, 5, 3, 4)
// 4

median([6, 1, 2, 3])
// 2.5
</code></pre>
`},{name:"stddev(list)",description:`<p>Returns the standard deviation of the given list of numbers.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">stddev(list: list&lt;number&gt;): number
</code></pre>
<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">stddev(2, 4, 7, 5)
// 2.0816659994661326

stddev([2, 4, 7, 5])
// 2.0816659994661326
</code></pre>
`},{name:"mode(list)",description:`<p>Returns the mode of the given list of numbers.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">mode(list: list&lt;number&gt;): number
</code></pre>
<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">mode(6, 3, 9, 6, 6)
// [6]

mode([6, 1, 9, 6, 1])
// [1, 6]
</code></pre>
`},{name:"all(list)",description:`<p>Returns <code>false</code> if any element of the given list is <code>false</code>. Otherwise, returns <code>true</code>.</p>
<p>If the given list is empty, it returns <code>true</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">all(list: list&lt;boolean&gt;): boolean
</code></pre>
<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">all([true,false])
// false

all(false,null,true)
// false
</code></pre>
<p>:::info
The function <code>all()</code> replaced the previous function <code>and()</code>. The previous function is deprecated and
should not be used anymore.
:::</p>
`},{name:"any(list)",description:`<p>Returns <code>true</code> if any element of the given list is <code>true</code>. Otherwise, returns <code>false</code>.</p>
<p>If the given list is empty, it returns <code>false</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">any(list: list&lt;boolean&gt;): boolean
</code></pre>
<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">any([false,true])
// true

any(false,null,true)
// true
</code></pre>
<p>:::info
The function <code>any()</code> replaced the previous function <code>or()</code>. The previous function is deprecated and
should not be used anymore.
:::</p>
`},{name:"sublist(list, start position)",description:`<p>Returns a partial list of the given value starting at <code>start position</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">sublist(list: list, start position: number): list
</code></pre>
<p>The <code>start position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">sublist([1,2,3], 2)
// [2,3]
</code></pre>
`},{name:"sublist(list, start position, length)",description:`<p>Returns a partial list of the given value starting at <code>start position</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">sublist(list: list, start position: number, length: number): list
</code></pre>
<p>The <code>start position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">sublist([1,2,3], 1, 2)
// [1,2]
</code></pre>
`},{name:"append(list, items)",description:`<p>Returns the given list with all <code>items</code> appended.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">append(list: list, items: Any): list
</code></pre>
<p>The parameter <code>items</code> can be a single element or a sequence of elements.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">append([1], 2, 3)
// [1,2,3]
</code></pre>
`},{name:"concatenate(lists)",description:`<p>Returns a list that includes all elements of the given lists.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">concatenate(lists: list): list
</code></pre>
<p>The parameter <code>lists</code> is a sequence of lists.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">concatenate([1,2],[3])
// [1,2,3]

concatenate([1],[2],[3])
// [1,2,3]
</code></pre>
`},{name:"insert before(list, position, newItem)",description:`<p>Returns the given list with <code>newItem</code> inserted at <code>position</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">insert before(list: list, position: number, newItem: Any): list
</code></pre>
<p>The <code>position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">insert before([1,3],1,2)
// [2,1,3]
</code></pre>
`},{name:"remove(list, position)",description:`<p>Returns the given list without the element at <code>position</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">remove(list: list, position: number): list
</code></pre>
<p>The <code>position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">remove([1,2,3], 2)
// [1,3]
</code></pre>
`},{name:"reverse(list)",description:`<p>Returns the given list in revered order.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">reverse(list: list): list
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">reverse([1,2,3])
// [3,2,1]
</code></pre>
`},{name:"index of(list, match)",description:`<p>Returns an ascending list of positions containing <code>match</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">index of(list: list, match: Any): list&lt;number&gt;
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">index of([1,2,3,2],2)
// [2,4]
</code></pre>
`},{name:"union(list)",description:`<p>Returns a list that includes all elements of the given lists without duplicates.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">union(list: list): list
</code></pre>
<p>The parameter <code>list</code> is a sequence of lists.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">union([1,2],[2,3])
// [1,2,3]
</code></pre>
`},{name:"distinct values(list)",description:`<p>Returns the given list without duplicates.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">distinct values(list: list): list
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">distinct values([1,2,3,2,1])
// [1,2,3]
</code></pre>
`},{name:"duplicate values(list)",description:`<p><em>Camunda Extension</em></p>
<p>Returns all duplicate values of the given list.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">duplicate values(list: list): list
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">duplicate values([1,2,3,2,1])
// [1,2]
</code></pre>
`},{name:"flatten(list)",description:`<p>Returns a list that includes all elements of the given list without nested lists.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">flatten(list: list): list
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">flatten([[1,2],[[3]], 4])
// [1,2,3,4]
</code></pre>
`},{name:"sort(list, precedes)",description:`<p>Returns the given list sorted by the <code>precedes</code> function.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">sort(list: list, precedes: function&lt;(Any, Any) -&gt; boolean&gt;): list
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">sort(list: [3,1,4,5,2], precedes: function(x,y) x &lt; y)
// [1,2,3,4,5]
</code></pre>
`},{name:"string join(list)",description:`<p>Joins a list of strings into a single string. This is similar to
Java&#39;s <a href="https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html#joining(java.lang.CharSequence,java.lang.CharSequence,java.lang.CharSequence)">joining</a>
function.</p>
<p>If an item of the list is <code>null</code>, the item is ignored for the result string. If an item is
neither a string nor <code>null</code>, the function returns <code>null</code> instead of a string.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">string join(list: list&lt;string&gt;): string
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">string join([&quot;a&quot;,&quot;b&quot;,&quot;c&quot;])
// &quot;abc&quot;

string join([&quot;a&quot;,null,&quot;c&quot;])
// &quot;ac&quot;

string join([])
// &quot;&quot;
</code></pre>
`},{name:"string join(list, delimiter)",description:`<p>Joins a list of strings into a single string. This is similar to
Java&#39;s <a href="https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html#joining(java.lang.CharSequence,java.lang.CharSequence,java.lang.CharSequence)">joining</a>
function.</p>
<p>If an item of the list is <code>null</code>, the item is ignored for the result string. If an item is
neither a string nor <code>null</code>, the function returns <code>null</code> instead of a string.</p>
<p>The resulting string contains a <code>delimiter</code> between each element.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">string join(list: list&lt;string&gt;, delimiter: string): string
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">string join([&quot;a&quot;], &quot;X&quot;)
// &quot;a&quot;

string join([&quot;a&quot;,&quot;b&quot;,&quot;c&quot;], &quot;, &quot;)
// &quot;a, b, c&quot;
</code></pre>
`},{name:"string join(list, delimiter, prefix, suffix)",description:`<p><em>Camunda Extension</em></p>
<p>Joins a list of strings into a single string. This is similar to
Java&#39;s <a href="https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html#joining(java.lang.CharSequence,java.lang.CharSequence,java.lang.CharSequence)">joining</a>
function.</p>
<p>If an item of the list is <code>null</code>, the item is ignored for the result string. If an item is
neither a string nor <code>null</code>, the function returns <code>null</code> instead of a string.</p>
<p>The resulting string starts with <code>prefix</code>, contains a <code>delimiter</code> between each element, and ends
with <code>suffix</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">string join(list: list&lt;string&gt;, delimiter: string, prefix: string, suffix: string): string
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">string join([&quot;a&quot;,&quot;b&quot;,&quot;c&quot;], &quot;, &quot;, &quot;[&quot;, &quot;]&quot;)
// &quot;[a, b, c]&quot;
</code></pre>
`},{name:"decimal(n, scale)",description:`<p>Rounds the given value at the given scale.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">decimal(n: number, scale: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">decimal(1/3, 2)
// .33

decimal(1.5, 0)
// 2
</code></pre>
`},{name:"floor(n)",description:`<p>Rounds the given value with rounding mode flooring.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">floor(n: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">floor(1.5)
// 1

floor(-1.5)
// -2
</code></pre>
`},{name:"floor(n, scale)",description:`<p>Rounds the given value with rounding mode flooring at the given scale.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">floor(n: number, scale: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">floor(-1.56, 1)
// -1.6
</code></pre>
`},{name:"ceiling(n)",description:`<p>Rounds the given value with rounding mode ceiling.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">ceiling(n: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">ceiling(1.5)
// 2

ceiling(-1.5)
// -1
</code></pre>
`},{name:"ceiling(n, scale)",description:`<p>Rounds the given value with rounding mode ceiling at the given scale.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">ceiling(n: number, scale: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">ceiling(-1.56, 1)
// -1.5
</code></pre>
`},{name:"round up(n, scale)",description:`<p>Rounds the given value with the rounding mode round-up at the given scale.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">round up(n: number, scale: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">round up(5.5)
// 6

round up(-5.5)
// -6

round up(1.121, 2)
// 1.13

round up(-1.126, 2)
// -1.13
</code></pre>
`},{name:"round down(n, scale)",description:`<p>Rounds the given value with the rounding mode round-down at the given scale.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">round down(n: number, scale: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">round down(5.5, 0)
// 5

round down (-5.5, 0)
// -5

round down (1.121, 2)
// 1.12

round down (-1.126, 2)
// -1.12
</code></pre>
`},{name:"round half up(n, scale)",description:`<p>Rounds the given value with the rounding mode round-half-up at the given scale.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">round half up(n: number, scale: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">round half up(5.5, 0)
// 6

round half up(-5.5, 0)
// -6

round half up(1.121, 2)
// 1.12

round half up(-1.126, 2)
// -1.13
</code></pre>
`},{name:"round half down(n, scale)",description:`<p>Rounds the given value with the rounding mode round-half-down at the given scale.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">round half down(n: number, scale: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">round half down (5.5, 0)
// 5

round half down (-5.5, 0)
// -5

round half down (1.121, 2)
// 1.12

round half down (-1.126, 2)
// -1.13
</code></pre>
`},{name:"abs(number)",description:`<p>Returns the absolute value of the given numeric value.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">abs(number: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">abs(10)
// 10

abs(-10)
// 10
</code></pre>
`},{name:"modulo(dividend, divisor)",description:`<p>Returns the remainder of the division of dividend by divisor.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">modulo(dividend: number, divisor: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">modulo(12, 5)
// 2
</code></pre>
`},{name:"sqrt(number)",description:`<p>Returns the square root of the given value.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">sqrt(number: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">sqrt(16)
// 4
</code></pre>
`},{name:"log(number)",description:`<p>Returns the natural logarithm (base e) of the given value.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">log(number: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">log(10)
// 2.302585092994046
</code></pre>
`},{name:"exp(number)",description:`<p>Returns the Euler’s number e raised to the power of the given number .</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">exp(number: number): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">exp(5)
// 148.4131591025766
</code></pre>
`},{name:"odd(number)",description:`<p>Returns <code>true</code> if the given value is odd. Otherwise, returns <code>false</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">odd(number: number): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">odd(5)
// true

odd(2)
// false
</code></pre>
`},{name:"even(number)",description:`<p>Returns <code>true</code> if the given is even. Otherwise, returns <code>false</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">even(number: number): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">even(5)
// false

even(2)
// true
</code></pre>
`},{name:"random number()",description:`<p><em>Camunda Extension</em></p>
<p>Returns a random number between <code>0</code> and <code>1</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">random number(): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">random number()
// 0.9701618132579795
</code></pre>
`},{name:"before(point1, point2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">before(point1: Any, point2: Any): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">before(1, 10)
// true

before(10, 1)
// false
</code></pre>
`},{name:"before(range, point)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">before(range: range, point: Any): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">before([1..5], 10)
// true
</code></pre>
`},{name:"before(point, range)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">before(point: Any, range: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">before(1, [2..5])
// true
</code></pre>
`},{name:"before(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">before(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">before([1..5], [6..10])
// true

before([1..5),[5..10])
// true
</code></pre>
`},{name:"after(point1, point2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">after(point1: Any, point2: Any): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">after(10, 1)
// true

after(1, 10)
// false
</code></pre>
`},{name:"after(range, point)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">after(range: range, point: Any): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">after([1..5], 10)
// false
</code></pre>
`},{name:"after(point, range)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">after(point: Any, range: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">after(12, [2..5])
// true
</code></pre>
`},{name:"after(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">after(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">after([6..10], [1..5])
// true

after([5..10], [1..5))
// true
</code></pre>
`},{name:"meets(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">meets(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">meets([1..5], [5..10])
// true

meets([1..3], [4..6])
// false

meets([1..3], [3..5])
// true

meets([1..5], (5..8])
// false
</code></pre>
`},{name:"met by(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">met by(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">met by([5..10], [1..5])
// true

met by([3..4], [1..2])
// false

met by([3..5], [1..3])
// true

met by((5..8], [1..5))
// false

met by([5..10], [1..5))
// false
</code></pre>
`},{name:"overlaps(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">overlaps(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">overlaps([5..10], [1..6])
// true

overlaps((3..7], [1..4])
// true

overlaps([1..3], (3..6])
// false

overlaps((5..8], [1..5))
// false

overlaps([4..10], [1..5))
// true
</code></pre>
`},{name:"overlaps before(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">overlaps before(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">overlaps before([1..5], [4..10])
// true

overlaps before([3..4], [1..2])
// false

overlaps before([1..3], (3..5])
// false

overlaps before([1..5), (3..8])
// true

overlaps before([1..5), [5..10])
// false
</code></pre>
`},{name:"overlaps after(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">overlaps after(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">overlaps after([4..10], [1..5])
// true

overlaps after([3..4], [1..2])
// false

overlaps after([3..5], [1..3))
// false

overlaps after((5..8], [1..5))
// false

overlaps after([4..10], [1..5))
// true
</code></pre>
`},{name:"finishes(point, range)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">finishes(point: Any, range: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">finishes(5, [1..5])
// true

finishes(10, [1..7])
// false
</code></pre>
`},{name:"finishes(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">finishes(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">finishes([3..5], [1..5])
// true

finishes((1..5], [1..5))
// false

finishes([5..10], [1..10))
// false
</code></pre>
`},{name:"finished by(range, point)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">finished by(range: range, point: Any): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">finished by([5..10], 10)
// true

finished by([3..4], 2)
// false
</code></pre>
`},{name:"finished by(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">finished by(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">finished by([1..5], [3..5])
// true

finished by((5..8], [1..5))
// false

finished by([5..10], (1..10))
// false
</code></pre>
`},{name:"includes(range, point)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">includes(range: range, point: Any): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">includes([5..10], 6)
// true

includes([3..4], 5)
// false
</code></pre>
`},{name:"includes(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">includes(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">includes([1..10], [4..6])
// true

includes((5..8], [1..5))
// false

includes([1..10], [1..5))
// true
</code></pre>
`},{name:"during(point, range)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">during(point: Any, range: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">during(5, [1..10])
// true

during(12, [1..10])
// false

during(1, (1..10])
// false
</code></pre>
`},{name:"during(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">during(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">during([4..6], [1..10))
// true

during((1..5], (1..10])
// true
</code></pre>
`},{name:"starts(point, range)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">starts(point: Any, range: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">starts(1, [1..5])
// true

starts(1, (1..8])
// false
</code></pre>
`},{name:"starts(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">starts(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">starts((1..5], [1..5])
// false

starts([1..10], [1..5])
// false

starts((1..5), (1..10))
// true
</code></pre>
`},{name:"started by(range, point)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">started by(range: range, point: Any): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">started by([1..10], 1)
// true

started by((1..10], 1)
// false
</code></pre>
`},{name:"started by(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">started by(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">started by([1..10], [1..5])
// true

started by((1..10], [1..5))
// false

started by([1..10], [1..10))
// true
</code></pre>
`},{name:"coincides(point1, point2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">coincides(point1: Any, point2: Any): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">coincides(5, 5)
// true

coincides(3, 4)
// false
</code></pre>
`},{name:"coincides(range1, range2)",description:`<p><strong>Function signature</strong></p>
<pre><code class="language-feel">coincides(range1: range, range2: range): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">coincides([1..5], [1..5])
// true

coincides((1..5], [1..5))
// false

coincides([1..5], [2..6])
// false
</code></pre>
`},{name:"substring(string, start position)",description:`<p>Returns a substring of the given value starting at <code>start position</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">substring(string: string, start position: number): string
</code></pre>
<p>The <code>start position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">substring(&quot;foobar&quot;, 3)
// &quot;obar&quot;
</code></pre>
`},{name:"substring(string, start position, length)",description:`<p>Returns a substring of the given value starting at <code>start position</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">substring(string: string, start position: number, length: number): string
</code></pre>
<p>The <code>start position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">substring(&quot;foobar&quot;, 3, 3)
// &quot;oba&quot;
</code></pre>
`},{name:"string length(string)",description:`<p>Returns the number of characters in the given value.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">string length(string: string): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">string length(&quot;foo&quot;)
// 3
</code></pre>
`},{name:"upper case(string)",description:`<p>Returns the given value with all characters are uppercase.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">upper case(string: string): string
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">upper case(&quot;aBc4&quot;)
// &quot;ABC4&quot;
</code></pre>
`},{name:"lower case(string)",description:`<p>Returns the given value with all characters are lowercase.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">lower case(string: string): string
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">lower case(&quot;aBc4&quot;)
// &quot;abc4&quot;
</code></pre>
`},{name:"substring before(string, match)",description:`<p>Returns a substring of the given value that contains all characters before <code>match</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">substring before(string: string, match: string): string
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">substring before(&quot;foobar&quot;, &quot;bar&quot;)
// &quot;foo&quot;
</code></pre>
`},{name:"substring after(string, match)",description:`<p>Returns a substring of the given value that contains all characters after <code>match</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">substring after(string: string, match: string): string
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">substring after(&quot;foobar&quot;, &quot;ob&quot;)
// &quot;ar&quot;
</code></pre>
`},{name:"contains(string, match)",description:`<p>Returns <code>true</code> if the given value contains the substring <code>match</code>. Otherwise, returns <code>false</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">contains(string: string, match: string): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">contains(&quot;foobar&quot;, &quot;of&quot;)
// false
</code></pre>
`},{name:"starts with(string, match)",description:`<p>Returns <code>true</code> if the given value starts with the substring <code>match</code>. Otherwise, returns <code>false</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">starts with(string: string, match: string): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">starts with(&quot;foobar&quot;, &quot;fo&quot;)
// true
</code></pre>
`},{name:"ends with(string, match)",description:`<p>Returns <code>true</code> if the given value ends with the substring <code>match</code>. Otherwise, returns <code>false</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">ends with(string: string, match: string): boolean
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">ends with(&quot;foobar&quot;, &quot;r&quot;)
// true
</code></pre>
`},{name:"matches(input, pattern)",description:`<p>Returns <code>true</code> if the given value matches the <code>pattern</code>. Otherwise, returns <code>false</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">matches(input: string, pattern: string): boolean
</code></pre>
<p>The <code>pattern</code> is a string that contains a regular expression.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">matches(&quot;foobar&quot;, &quot;^fo*bar&quot;)
// true
</code></pre>
`},{name:"matches(input, pattern, flags)",description:`<p>Returns <code>true</code> if the given value matches the <code>pattern</code>. Otherwise, returns <code>false</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">matches(input: string, pattern: string, flags: string): boolean
</code></pre>
<p>The <code>pattern</code> is a string that contains a regular expression.</p>
<p>The <code>flags</code> can contain one or more of the following characters:</p>
<ul>
<li><code>s</code> (dot-all)</li>
<li><code>m</code> (multi-line)</li>
<li><code>i</code> (case insensitive)</li>
<li><code>x</code> (comments)</li>
</ul>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">matches(&quot;FooBar&quot;, &quot;foo&quot;, &quot;i&quot;)
// true
</code></pre>
`},{name:"replace(input, pattern, replacement)",description:`<p>Returns the resulting string after replacing all occurrences of <code>pattern</code> with <code>replacement</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">replace(input: string, pattern: string, replacement: string): string
</code></pre>
<p>The <code>pattern</code> is a string that contains a regular expression.</p>
<p>The <code>replacement</code> can access the match groups by using <code>$</code> and the number of the group, for example,
<code>$1</code> to access the first group.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">replace(&quot;abcd&quot;, &quot;(ab)|(a)&quot;, &quot;[1=$1][2=$2]&quot;)
// &quot;[1=ab][2=]cd&quot;

replace(&quot;0123456789&quot;, &quot;(\\d{3})(\\d{3})(\\d{4})&quot;, &quot;($1) $2-$3&quot;)
// &quot;(012) 345-6789&quot;
</code></pre>
`},{name:"replace(input, pattern, replacement, flags)",description:`<p>Returns the resulting string after replacing all occurrences of <code>pattern</code> with <code>replacement</code>.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">replace(input: string, pattern: string, replacement: string, flags: string): string
</code></pre>
<p>The <code>pattern</code> is a string that contains a regular expression.</p>
<p>The <code>replacement</code> can access the match groups by using <code>$</code> and the number of the group, for example,
<code>$1</code> to access the first group.</p>
<p>The <code>flags</code> can contain one or more of the following characters:</p>
<ul>
<li><code>s</code> (dot-all)</li>
<li><code>m</code> (multi-line)</li>
<li><code>i</code> (case insensitive)</li>
<li><code>x</code> (comments)</li>
</ul>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">replace(&quot;How do you feel?&quot;, &quot;Feel&quot;, &quot;FEEL&quot;, &quot;i&quot;)
// &quot;How do you FEEL?&quot;
</code></pre>
`},{name:"split(string, delimiter)",description:`<p>Splits the given value into a list of substrings, breaking at each occurrence of the <code>delimiter</code> pattern.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">split(string: string, delimiter: string): list&lt;string&gt;
</code></pre>
<p>The <code>delimiter</code> is a string that contains a regular expression.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">split(&quot;John Doe&quot;, &quot;\\s&quot; )
// [&quot;John&quot;, &quot;Doe&quot;]

split(&quot;a;b;c;;&quot;, &quot;;&quot;)
// [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;&quot;, &quot;&quot;]
</code></pre>
`},{name:"extract(string, pattern)",description:`<p><em>Camunda Extension</em></p>
<p>Returns all matches of the pattern in the given string. Returns an empty list if the pattern doesn&#39;t
match.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">extract(string: string, pattern: string): list&lt;string&gt;
</code></pre>
<p>The <code>pattern</code> is a string that contains a regular expression.</p>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">extract(&quot;references are 1234, 1256, 1378&quot;, &quot;12[0-9]*&quot;)
// [&quot;1234&quot;,&quot;1256&quot;]
</code></pre>
`},{name:"now()",description:`<p>Returns the current date and time including the timezone.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">now(): date and time
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">now()
// date and time(&quot;2020-07-31T14:27:30@Europe/Berlin&quot;)
</code></pre>
`},{name:"today()",description:`<p>Returns the current date.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">today(): date
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">today()
// date(&quot;2020-07-31&quot;)
</code></pre>
`},{name:"day of week(date)",description:`<p>Returns the day of the week according to the Gregorian calendar. Note that it always returns the English name of the day.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">day of week(date: date): string
</code></pre>
<pre><code class="language-feel">day of week(date: date and time): string
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">day of week(date(&quot;2019-09-17&quot;))
// &quot;Tuesday&quot;

day of week(date and time(&quot;2019-09-17T12:00:00&quot;))
// &quot;Tuesday&quot;
</code></pre>
`},{name:"day of year(date)",description:`<p>Returns the Gregorian number of the day within the year.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">day of year(date: date): number
</code></pre>
<pre><code class="language-feel">day of year(date: date and time): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">day of year(date(&quot;2019-09-17&quot;))
// 260

day of year(date and time(&quot;2019-09-17T12:00:00&quot;))
// 260
</code></pre>
`},{name:"week of year(date)",description:`<p>Returns the Gregorian number of the week within the year, according to ISO 8601.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">week of year(date: date): number
</code></pre>
<pre><code class="language-feel">week of year(date: date and time): number
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">week of year(date(&quot;2019-09-17&quot;))
// 38

week of year(date and time(&quot;2019-09-17T12:00:00&quot;))
// 38
</code></pre>
`},{name:"month of year(date)",description:`<p>Returns the month of the year according to the Gregorian calendar. Note that it always returns the English name of the month.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">month of year(date: date): string
</code></pre>
<pre><code class="language-feel">month of year(date: date and time): string
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">month of year(date(&quot;2019-09-17&quot;))
// &quot;September&quot;

month of year(date and time(&quot;2019-09-17T12:00:00&quot;))
// &quot;September&quot;
</code></pre>
`},{name:"abs(n)",description:`<p>Returns the absolute value of a given duration.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">abs(n: days and time duration): days and time duration
</code></pre>
<pre><code class="language-feel">abs(n: years and months duration): years and months duration
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">abs(duration(&quot;-PT5H&quot;))
// &quot;duration(&quot;PT5H&quot;)&quot;

abs(duration(&quot;PT5H&quot;))
// &quot;duration(&quot;PT5H&quot;)&quot;

abs(duration(&quot;-P2M&quot;))
// duration(&quot;P2M&quot;)
</code></pre>
`},{name:"last day of month(date)",description:`<p><em>Camunda Extension</em></p>
<p>Takes the month of the given date or date-time value and returns the last day of this month.</p>
<p><strong>Function signature</strong></p>
<pre><code class="language-feel">last day of month(date: date): date
</code></pre>
<pre><code class="language-feel">last day of month(date: date and time): date
</code></pre>
<p><strong>Examples</strong></p>
<pre><code class="language-feel">last day of month(date(&quot;2022-10-01&quot;))
// date(&quot;2022-10-31&quot;))

last day of month(date and time(&quot;2022-10-16T12:00:00&quot;))
// date(&quot;2022-10-31&quot;))
</code></pre>
`}];function Fe(e){return e.map(we)}function we(e){const{name:t,description:n}=e,o=t.match(/^([\w\s]+)\((.*)\)$/),s=o[1],a=o[2].split(", ").map(c=>({name:c}));return{name:s,type:"function",params:a,info:()=>se(`<div class="description">${n}<div>`),boost:0}}const Te=Fe(Ee),P=new R,$=new R;function m({extensions:e=[],dialect:t="expression",container:n,contentAttributes:o={},tooltipContainer:s,onChange:p=()=>{},onKeyDown:a=()=>{},onLint:c=()=>{},placeholder:l="",readOnly:f=!1,value:r="",builtins:g=Te,variables:q=[]}){const z=u.updateListener.of(h=>{h.docChanged&&p(h.state.doc.toString())}),O=u.updateListener.of(h=>{const E=h.transactions.flatMap(d=>d.effects).filter(d=>d.is(W));if(!E.length)return;const H=E.flatMap(d=>d.value);c(H)}),B=u.domEventHandlers({keydown:a});typeof s=="string"&&(s=document.querySelector(s));const L=s?U({tooltipSpace:function(){return s.getBoundingClientRect()}}):[],y=[N(),P.of(S({dialect:t,builtins:g,variables:q})),G(),K(),_(),u.contentAttributes.of(o),z,B,X.of([...D]),ae,O,L,$.of(k(l)),ce,...e];return f&&y.push(u.editable.of(!1)),this._cmEditor=new u({state:Z.create({doc:r,extensions:y}),parent:n}),this}m.prototype.setValue=function(e){this._cmEditor.dispatch({changes:{from:0,to:this._cmEditor.state.doc.length,insert:e}})};m.prototype.focus=function(e){const t=this._cmEditor;if(t.contentDOM.focus(),t.focus(),typeof e=="number"){const n=t.state.doc.length;t.dispatch({selection:{anchor:e<=n?e:n}})}};m.prototype.getSelection=function(){return this._cmEditor.state.selection};m.prototype.setVariables=function(e){const{dialect:t,builtins:n}=ye(this._cmEditor.state);this._cmEditor.dispatch({effects:[P.reconfigure(S({dialect:t,builtins:n,variables:e}))]})};m.prototype.setPlaceholder=function(e){this._cmEditor.dispatch({effects:$.reconfigure(k(e))})};export{m as F};
