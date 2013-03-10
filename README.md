# MoveZoom

## What is it?

MoveZoom is a small JavaScript Library allowing to zoom a portion of image by moving the move over it. 

* It is released under the <a href="http://www.gnu.org/licenses/gpl.html">GNU Public License</a>, any contribution, enhancement or adaptation is fairly welcomed.
* Current version is 0.1, it can be downloaded <a href="http://semeteys.org/tek/JavaScript/MoveZoom/MoveZoom.js">here</a>.
* ScriptDoc Reference is available <a href="http://semeteys.org/tek/JavaScript/MoveZoom/MoveZoom_docs/index.html">here</a>.
* It has been tested on Mozilla Firefox et Internet Explorer, please report any compatibility problems (raphael AT semeteys DOT org).

## How to use it in your web page?

Check HTML/JavaScript code of <a href="http://semeteys.org/tek/JavaScript/MoveZoom/">this</a> page... 

* Insert the <i>MoveZoom.js</i> script somewhere in your HTML document (in the &lt;head&gt; tag for instance): 
<pre>
&lt;script type="text/javascript" src="MoveZoom.js"&gt;&lt;/script&gt;  
</pre>

* The image to become zoomable must have an unique <i>id</i>, <i>width</i> and <i>height</i> attributes can be used to reduce image's size. 
<pre>
&lt;img id="myImage" src="rose.jpg" width="529" height="410"/&gt;
</pre>

* Call the <i>MoveZoom.init()</i> function: 

    + Either from the <i>onload</i> event of the HTML page or form another &lt;script&gt; insert (in that case it must be placed <b>after</b> the <i>MoveZoom.js</i> include)

    + With the image id and zoom ratio id as parameters 
<pre>
&lt;body onload = "MoveZoom.init('myImage', 3);"&gt;
</pre>

