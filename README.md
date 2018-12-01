# Usage  
1. Create your fragment file `header.html` in `ctr-tmps` folder
```html
<div class="header">
    This is Header part.
</div>
```

2. Then do it like following
```html
<html>
<head></head>
<body>
{{header}}
</body>
</html>
```

### Result  
```html
<html>
<head></head>
<body>
    <div class="header">
        This is Header part.
    </div>
</body>
</html>
```

# FAQ  

## File extension-name

If source file ext is `.js` , frag file ext must be `.js`

## Multi-level filepath
```
{{parentFolder/childFolder/filename}}
```
It will replace the frag from `ctr-tmps/parentFolder/childFolder/filename.*` 
