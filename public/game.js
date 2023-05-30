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

        const score = {
            human: 0,
            computer: 0,

            increaseHuman: function (){
                this.human++;
            },

            increseaseComputer: function(){
                this.computer++;
            },

            draw:function(){
                canvasCtx.font = "bold 72px Arial"
                canvasCtx.textAlign = "center"
                canvasCtx.textBaseline = "#01341D"
                canvasCtx.fillText(this.human, field.w / 4, 100)
                canvasCtx.fillText(this.computer, field.w / 2 + field.w / 4, 100)
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
            speed: 5,
            _move: function(){
                if(this.y + this.h / 2 < ball.y + ball.r){
                    this.y += this.speed
                }else{
                    this.y -= this.speed
                }
            },

            _speedUp: function(){
                this.speed++;
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
            directionX:1,
            directionY:1,
            
            _calcPosition: function(){
            //Verifica se o jogador 1(humano) fez um ponto
                if(this.x > field.w - this.r - rightPaddle.w - gapX){
                    if(this.y + this.r > rightPaddle.y && 
                        this.y - this.r < rightPaddle.y + rightPaddle.h){
                        //Rebater a bola
                        this._reverseX();
                    }else{
                        //Fazer o ponto
                        score.increaseHuman();
                        this._pointUp()
                    }
                }

                //Verifica se o jogador 2(computador) fez um ponto
                if(this.x < this.r + leftPaddle.w + gapX){
                    if(this.y + this.r > leftPaddle.y &&
                     this.y - this.r < leftPaddle.y + leftPaddle.h){                      
                         //Rebater a bola
                         this._reverseX();
                     }
                else{
                    //Faz o ponto
                    score.increseaseComputer();
                    this._pointUp()
                }
            } 
            //Calcula a posição vertical da bola (Eixo Y)
                if(
                (this.y - this.r < 0 && this.directionY < 0) ||
                (this.y > field.h - this.r && this.directionY > 0)){
                    this._reverseY()
                }
            },

            _reverseX: function(){
                this.directionX *= -1;
            },

            _reverseY: function(){
                this.directionY *= -1;
            },

            _move: function(){ //Animando a bola
                this.x += this.directionX * this.speed;
                this.y += this.directionY * this.speed;
            },

            _speedUp: function(){
                this.speed+=3;
            },

            _pointUp: function(){
                this.x = field.w / 2
                this.y = field.h / 2

                this._reverseX()
                this._speedUp()
                rightPaddle._speedUp()
            },

            draw: function(){
            //Desenho da bola |arc(x, y, raio, 0, 2.0 * math.PI, FALSE) 
            canvasCtx.fillStyle = "#ffffff";
            canvasCtx.beginPath();
            canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            canvasCtx.fill();

            this._calcPosition();
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
            score.draw();

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

        //Adicionando evento da movimentação do mouse
        canvasEl.addEventListener("mousemove", function(e){
            mouse.x = e.pageX;
            mouse.y = e.pageY;
        });
        