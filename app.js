var clipboard_image = new Clipboard("canvas", true);

function Clipboard(id, autoResize){
    var canvas = document.getElementById(id);
    var _self = this;
    var ctx = document.getElementById(id).getContext("2d");
    var resize = autoResize;
    var width = canvas.width;
    var height = canvas.height;
    console.log(canvas);

    document.addEventListener("paste", function(e){
        _self.paste_image(e);
    }, false);

    this.paste_image = function(e){
        this.clear_canvas();
        if(e.clipboardData){
            var items = (e.clipboardData  || e.originalEvent.clipboardData).items;
            for(var i =0; i < items.length; i++){
                console.log(items[i]);
                if (items[i].type.indexOf("image") !== -1) {
                    var blob = items[i].getAsFile();
                    console.log(blob);
                    var URLObj = window.URL || window.webkitURL;
                    console.log(URLObj);
                    var source = URLObj.createObjectURL(blob);
                    console.log(source);
                    this.paste_createImage(source);
                }
            }
        }
    };

    this.clear_canvas = function(){
        canvas.width = 300;
        canvas.height = 300;
        ctx.clearRect(0, 0, width, height);
    };
    this.paste_createImage= function(source){
        var pastedImage = new Image();
        pastedImage.onload = function(){
            if(resize == true){
                canvas.width = pastedImage.width;
                canvas.height = pastedImage.height;
            }
            ctx.drawImage(pastedImage, 0, 0);
        };
        pastedImage.src = source;
    };
};