# code-template-replace README

## Usage:

* input your customized replacement

    like this:
        ```
        {{replacementName}}
        ```
* and create a replace file in folder `ctr-tmps` 

* **warning:** the filename extension of created file must be now your active document's filename extension .

* Example:

    Now,I'm coding a html file,
    ```html
        <html>
        <head></head>
        <body>
            {{header}}
        </body>
        </html>
    ```

    And I should create a "header.html" in "templates" folder;
    ```html
        <div class="header">
            This is Header part.
        </div>
    ```

    Then I can Press F1, and input "Code Replace" to replace "{{header}}" into the content of "header.html".

    Surely, I also could Press key "Ctrl + Alt + 0" to Active the extension;
