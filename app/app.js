!function($w){
    var config;
    var renderer;
    var rootStage;
    var graphics;
    var bounds;
    var sprite;
    var spriteS;
    var spriteEc;
    var spriteR;
    var spritePo;
    var g;
    var graphicsS;
    var graphicsR;
    var figures = 3;
    var max = 6;
    var min = 1;
    var figure;
    var arr = [];
    var speed = 1;
    var i =0;
    var s = 0;
    var arrFigure = []

    function setup(_config){
        config = _config;
        renderer = new PIXI.WebGLRenderer(config.resolution.width, config.resolution.height);
        renderer.backgroundColor = config.backgroundColor;


        $w.document.body.appendChild(renderer.view);

        rootStage = new PIXI.Container();

        var Rect = new PIXI.Graphics();
        Rect.beginFill(0xDDDDDD);
        Rect.drawRect(640, 640, 640, 640);
        Rect.endFill();

        var texture = Rect.generateTexture();
        Rectv = new PIXI.Sprite(texture);
        Rectv.interactive = true;
        Rectv.position.set(0, 0);
        Rectv.ink = true;
        rootStage.addChild(Rectv);

        rootStage.interactive = true;
        rootStage.on('pointerdown', onClick);

        build();

        document.getElementById("speed-plus").addEventListener("click", function(){
            speed ++;
            document.getElementById("speed_value").textContent = speed;
        });
        document.getElementById("speed-minus").addEventListener("click", function(){
            speed --;
            document.getElementById("speed_value").textContent = speed;
        });
        document.getElementById("count-minus").addEventListener("click", function(){
            figures--;
            document.getElementById("count_value").textContent = figures;
        });
        document.getElementById("count-plus").addEventListener("click", function(){
            figures++;
            document.getElementById("count_value").textContent = figures;
        });

        return render;
    }
    function onClick (e){
        if(e.target.ink){
            var mouseData = e.data.getLocalPosition(rootStage);
            build(mouseData, true);
        }
    }
    function build(mouseData, one){
        if(one){
            figures = 1;
        }
        for(var f=1; f<=figures; f++){
            figure  = Math.floor(Math.random() * (max - min) + min);
            switch (figure) {
                case 1:
                    rectangle(mouseData);
                    break;
                case 2:
                    shape(mouseData);
                    break;
                case 3:
                    circle(mouseData);
                    break;
                case 4:
                    ellipse(mouseData);
                    break;
                case 5:
                    polygon(mouseData);
                    break;
                default:
                    return false;
            }
        }
    }

    function polygon(mouseData){
        g = new PIXI.Graphics();
        g.beginFill(Math.floor( 0xFFFFFF * Math.random()));
        g.drawPolygon([20,50, 40,90, 80,90, 95,50, 60,20, 20,50]);
        g.endFill();

        var texture = g.generateTexture();
        spritePo = new PIXI.Sprite(texture);
        spritePo.interactive = true;
        spritePo.anchor.set(0.5, 0.5);
        if(!mouseData){
            spritePo.position.set(config.resolution.width * Math.random(), -50);
        }else{
            spritePo.position.set(mouseData.x , mouseData.y);
        }
        rootStage.addChild(spritePo);
        arr.push(spritePo);
        arrFigure.push('polygon');
    }
    function ellipse(mouseData){
        bounds = new PIXI.Graphics();
        bounds.beginFill(Math.floor( 0xFFFFFF * Math.random()));
        bounds.drawEllipse(170, 185, 45, 25);
        bounds.endFill();


        var texture = bounds.generateTexture();
        spriteEc = new PIXI.Sprite(texture);
        spriteEc.interactive = true;
        spriteEc.anchor.set(0.5, 0.5);
        if(!mouseData){
            spriteEc.position.set(config.resolution.width * Math.random(), -50);
        }else{
            spriteEc.position.set(mouseData.x , mouseData.y);
        }
        rootStage.addChild(spriteEc);
        arr.push(spriteEc);
        arrFigure.push('ellipse');
    }
    function circle(mouseData){
        graphics = new PIXI.Graphics();
        graphics.beginFill(Math.floor( 0xFFFFFF * Math.random()));
        graphics.drawCircle(config.resolution.width * Math.random(), -100,60);
        graphics.endFill();

        var texture = graphics.generateTexture();
        sprite = new PIXI.Sprite(texture);
        sprite.interactive = true;
        sprite.anchor.set(0.5, 0.5);
        sprite.position.set(config.resolution.width * Math.random(), -50);
        rootStage.addChild(sprite);
        arr.push(sprite);
        arrFigure.push('sprite');
    }
    function shape(mouseData){
        graphicsS = new PIXI.Graphics();
        graphicsS.beginFill(Math.floor( 0xFFFFFF * Math.random()));
        graphicsS.moveTo(50,50);
        graphicsS.lineTo(100, 50);
        graphicsS.lineTo(100, 100);
        graphicsS.lineTo(50, 50);
        graphicsS.endFill();

        var texture = graphicsS.generateTexture();
        spriteS = new PIXI.Sprite(texture);
        spriteS.interactive = true;
        spriteS.anchor.set(0.5, 0.5);
        spriteS.position.set(config.resolution.width * Math.random(), -50);
        rootStage.addChild(spriteS);
        arr.push(spriteS);
        arrFigure.push('spriteS');
    }
    function rectangle(mouseData){
        graphicsR = new PIXI.Graphics();
        graphicsR.beginFill(Math.floor( 0xFFFFFF * Math.random()));
        graphicsR.drawRect(50, 250, 120, 120);
        graphicsR.endFill();

        var texture = graphicsR.generateTexture();
        spriteR = new PIXI.Sprite(texture);
        spriteR.interactive = true;
        spriteR.anchor.set(0.5, 0.5);
        spriteR.position.set(config.resolution.width * Math.random(), -50);
        rootStage.addChild(spriteR);
        arr.push(spriteR);
        arrFigure.push('spriteR');
    }
    function move(){
        i++;
        if(i==60){
            document.getElementById("count_inner").textContent = arr.length;
            build();
            i=1;
            arrFigure.forEach(function(item, i, arr) {
                switch (item) {
                    case 'spriteR':
                        var r = 120 * 120;
                        s = s + r;
                        break;
                    case 'spriteS':
                        var t = (50 * 50)/2;
                        s = s + t;
                        break;
                    case 'sprite':
                        var sq = 3.14 * Math.pow(60,2);
                        s = s + sq;
                        break;
                    case 'spriteEc':
                        var e = 3.14 * 45 * 25;
                        s = s + e;
                        break;
                    case 'spritePo':
                        var p = Math.pow(40,2)/4*Math.sqrt(25+10*Math.sqrt(5));
                        s = s + p;
                        break;
                    default:
                        return false;
                }
                document.getElementById("count_square").textContent = s.toFixed();
            })
            s=0;
        }
        arr.forEach(function(item, i, arr) {
            item.click = function (e) {
                rootStage.removeChild(item)
                document.getElementById("count_inner").textContent = arr.length;
            }
            item.position.y += speed;
            if(item.position.y>550){
                rootStage.removeChild(item);
                var index = arr.indexOf(item);
                arr.splice(index, 1);
                arrFigure.splice(index, 1);
            }
        });

    }
    function render(){
        move();
        renderer.render(rootStage);
        requestAnimationFrame(render)
    }

    $w.setup = setup;
}(this);