const canvasEl = document.querySelector("canvas"),
canvasCtx = canvasEl.getContext("2d"),
gapX = 10;
const mouse = {x: 0, y: 0}

        const field = {
            w: window.innerWidth,
            h: window.innerHeight,

            draw: function(){
            //Desenho do campo
            canvasCtx.fillStyle = "#000000";
            canvasCtx.fillRect(0, 0, this.w, this.h); //(x,y,largura,altura)
            },
        }
        
        const line = {
            w: 15,
            h: field.h,

            draw: function(){
                //Desenho da linha central
            canvasCtx.fillStyle = "#ffffff";
            //x = largura do campo / 2 - espessura da linha / 2, lineWidth = espessura da linha, A = altura do campo
            canvasCtx.fillRect(field.w / 2 - this.w / 2, 0, this.w, this.h)
            },
        }

        const leftPaddle = {
            x: gapX,
            y: field.h / 2,
            w: line.w,
            h: 200,

            _move: function(){
                this.y  = mouse.y;
            },

            draw: function(){
                            //Desenho da raquete esquerda
            canvasCtx.fillStyle = "#ffffff";
            canvasCtx.fillRect(this.x, this.y, this.w, this.h)

            this._move();
            }
        }

        const rightPaddle = {
            x: field.w - line.w - gapX,
            y: field.h / 2,
            w: line.w,
            h: 200,
            _move: function(){
                this.y = ball.y;
            },

            draw: function(){
                            //Desenho da raquete direita
            canvasCtx.fillStyle = "#ffffff";
            canvasCtx.fillRect(this.x, this.y, this.w, this.h)

            this._move();
            },
            
        }

        const ball = {
            x: field.w / 2,
            y: field.h / 2,
            r: 20,
            speed: 5,
            _calcPosition: function(){
                
            },

            _move: function(){  //Animando a bola
                this.x += this.speed;
                this.y += this.speed;
            },

            draw: function(){
                //Desenho da bola |arc(x, y, raio, 0, 2.0 * math.PI, FALSE) 
            canvasCtx.fillStyle = "#ffffff";
            canvasCtx.beginPath();
            canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            canvasCtx.fill();

            this._move();

            }
        }

        function setup(){       //Definir as dimensões do canvas context
            canvasEl.width = canvasCtx.width = window.innerWidth;
            //canvasEl.height = window.innerHeight;

            canvasEl.height = canvasCtx.height = window.innerHeight;
            //canvasCtx.height = window.innerHeight;
        }

        function draw(){    
            field.draw();
            line.draw();

            leftPaddle.draw();
            rightPaddle.draw();

            ball.draw();
        }

        //Chama todas as funções possíveis de animateFrame para cada navegador caso a chamada
        //oficial não funcione
        window.animateFrame = (function(){
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||          
                function(callback){
                    return window.setTimeout(callback, 1000 / 60);
                }
            )
        })()

        function main(){
            animateFrame(main);
            draw();
        }

        setup();
        main();

        canvasEl.addEventListener("mousemove", function(e){
            mouse.x = e.pageX;
            mouse.y = e.pageY;
        });
        