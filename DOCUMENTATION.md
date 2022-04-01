## Classes

<dl>
<dt><a href="#FSAccessError">FSAccessError</a> ⇐ <code>Error</code></dt>
<dd><p>Filesystem access error, providing the inaccessible path in the error
message.</p>
</dd>
<dt><a href="#HLJSHighlightAutoError">HLJSHighlightAutoError</a> ⇐ <code><a href="#HLJSHighlightError">HLJSHighlightError</a></code></dt>
<dd><p>Represents an error encountered when automatically highlighting an input
string with <code>highlight.js</code>.</p>
</dd>
<dt><a href="#HLJSHighlightError">HLJSHighlightError</a> ⇐ <code>Error</code></dt>
<dd><p>Represents an error encountered when highlighting an input string with an
explicit language via <code>highlight.js</code>.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#VALID_MARKDOWN_EXTENSIONS">VALID_MARKDOWN_EXTENSIONS</a> : <code>Array.&lt;string&gt;</code></dt>
<dd><p>Valid markdown extensions. Currently .md and .markdown are considered.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#renderCommandHandler">renderCommandHandler([args])</a></dt>
<dd><p>Renders markdown files to HTML based on passed parameters.</p>
</dd>
<dt><a href="#renderFile">renderFile([args])</a> ⇒ <code><a href="#RenderableFile">Promise.&lt;RenderableFile&gt;</a></code></dt>
<dd><p>Renders a single markdown file to HTML.</p>
</dd>
<dt><a href="#ensurePath">ensurePath([dirPath])</a> ⇒ <code>Promise</code></dt>
<dd><p>Ensures the specified path is accessible.</p>
</dd>
<dt><a href="#getFilesInDirectoryByExts">getFilesInDirectoryByExts([args])</a> ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code></dt>
<dd><p>Returns all markdown files in the specified directory as fs nodes. By
default considers files with &#39;.md&#39; or &#39;.markdown&#39; extensions.</p>
</dd>
<dt><a href="#getMdFilesInDirectory">getMdFilesInDirectory([args])</a> ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code></dt>
<dd><p>Returns markdown files in the requested directory. Optionally recurses.</p>
</dd>
<dt><a href="#getNodesInDirectory">getNodesInDirectory([args])</a> ⇒ <code><a href="#DirectoryNodes">Promise.&lt;DirectoryNodes&gt;</a></code></dt>
<dd><p>Returns an array of filenames in the specified directory.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#RenderableFile">RenderableFile</a></dt>
<dd></dd>
<dt><a href="#DirectoryNodes">DirectoryNodes</a></dt>
<dd></dd>
</dl>

<a name="FSAccessError"></a>

## FSAccessError ⇐ <code>Error</code>
Filesystem access error, providing the inaccessible path in the error
message.

**Kind**: global class  
**Extends**: <code>Error</code>  

* [FSAccessError](#FSAccessError) ⇐ <code>Error</code>
    * [new FSAccessError(path, origError)](#new_FSAccessError_new)
    * [.getPath()](#FSAccessError+getPath) ⇒ <code>string</code>

<a name="new_FSAccessError_new"></a>

### new FSAccessError(path, origError)
Creates a new error object.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | path that was deemed inaccessible |
| origError | <code>Error</code> | original error, if any |

<a name="FSAccessError+getPath"></a>

### fsAccessError.getPath() ⇒ <code>string</code>
Returns the inaccessible path.

**Kind**: instance method of [<code>FSAccessError</code>](#FSAccessError)  
**Returns**: <code>string</code> - path - path that was deemed inaccessible  
<a name="HLJSHighlightAutoError"></a>

## HLJSHighlightAutoError ⇐ [<code>HLJSHighlightError</code>](#HLJSHighlightError)
Represents an error encountered when automatically highlighting an input
string with `highlight.js`.

**Kind**: global class  
**Extends**: [<code>HLJSHighlightError</code>](#HLJSHighlightError)  

* [HLJSHighlightAutoError](#HLJSHighlightAutoError) ⇐ [<code>HLJSHighlightError</code>](#HLJSHighlightError)
    * [new HLJSHighlightAutoError(lang, str, origError)](#new_HLJSHighlightAutoError_new)
    * [.getString()](#HLJSHighlightError+getString) ⇒ <code>string</code>

<a name="new_HLJSHighlightAutoError_new"></a>

### new HLJSHighlightAutoError(lang, str, origError)
Creates a new HLJSHighlightAutoError object.


| Param | Type | Description |
| --- | --- | --- |
| lang | <code>string</code> | source language |
| str | <code>string</code> | source |
| origError | <code>Error</code> | original error, if any |

<a name="HLJSHighlightError+getString"></a>

### hljsHighlightAutoError.getString() ⇒ <code>string</code>
Returns the string that triggered the error.

**Kind**: instance method of [<code>HLJSHighlightAutoError</code>](#HLJSHighlightAutoError)  
**Overrides**: [<code>getString</code>](#HLJSHighlightError+getString)  
**Returns**: <code>string</code> - str  
<a name="HLJSHighlightError"></a>

## HLJSHighlightError ⇐ <code>Error</code>
Represents an error encountered when highlighting an input string with an
explicit language via `highlight.js`.

**Kind**: global class  
**Extends**: <code>Error</code>  

* [HLJSHighlightError](#HLJSHighlightError) ⇐ <code>Error</code>
    * [new HLJSHighlightError(lang, str, origError)](#new_HLJSHighlightError_new)
    * [.getString()](#HLJSHighlightError+getString) ⇒ <code>string</code>

<a name="new_HLJSHighlightError_new"></a>

### new HLJSHighlightError(lang, str, origError)
Creates a new HLJSHighlightAutoError object.


| Param | Type | Description |
| --- | --- | --- |
| lang | <code>string</code> | source language |
| str | <code>string</code> | source |
| origError | <code>Error</code> | original error, if any |

<a name="HLJSHighlightError+getString"></a>

### hljsHighlightError.getString() ⇒ <code>string</code>
Returns the string that triggered the error.

**Kind**: instance method of [<code>HLJSHighlightError</code>](#HLJSHighlightError)  
**Returns**: <code>string</code> - str  
<a name="VALID_MARKDOWN_EXTENSIONS"></a>

## VALID\_MARKDOWN\_EXTENSIONS : <code>Array.&lt;string&gt;</code>
Valid markdown extensions. Currently .md and .markdown are considered.

**Kind**: global constant  
<a name="renderCommandHandler"></a>

## renderCommandHandler([args])
Renders markdown files to HTML based on passed parameters.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [args] | <code>object</code> | <code>{}</code> | arguments |
| [args.overwrite] | <code>boolean</code> | <code>false</code> | if true, existing files are   overwritten |
| [args.hidden] | <code>boolean</code> | <code>true</code> | if false, hidden files (names starting   with a '.') will not be rendered |
| args.dest | <code>string</code> |  | destination directory to write HTML output too |
| args.src | <code>string</code> |  | source path to read markdown files from |
| args.recursive | <code>string</code> |  | if directories are to be searched for   further renderable files. |

<a name="renderFile"></a>

## renderFile([args]) ⇒ [<code>Promise.&lt;RenderableFile&gt;</code>](#RenderableFile)
Renders a single markdown file to HTML.

**Kind**: global function  
**Returns**: [<code>Promise.&lt;RenderableFile&gt;</code>](#RenderableFile) - p  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [args] | <code>Object</code> | <code>{}</code> | args |
| args.file | <code>FSFile</code> |  | file to render |
| args.srcPath | <code>string</code> |  | source path |
| args.destPath | <code>string</code> |  | destination path |
| args.overwrite | <code>boolean</code> |  | overwrite existing files |

<a name="ensurePath"></a>

## ensurePath([dirPath]) ⇒ <code>Promise</code>
Ensures the specified path is accessible.

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves on success  
**Throws**:

- [<code>FSAccessError</code>](#FSAccessError) if the path is not accessible.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [dirPath] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | path to check |

<a name="getFilesInDirectoryByExts"></a>

## getFilesInDirectoryByExts([args]) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Returns all markdown files in the specified directory as fs nodes. By
default considers files with '.md' or '.markdown' extensions.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - p  
**Throws**:

