define(
    [
        'amd-utils/lang/createObject',
        'amd-utils/math/countSteps',
        'amd-utils/math/clamp',
        'amd-utils/number/toUInt',
        './SpriteAnim'
    ],
    function(createObject, countSteps, clamp, toUInt, SpriteAnim){

        /**
         * SpriteSheet Animation Timeline with fixed sized frames.
         * @author Miller Medeiros
         * @version 0.5.0 (2011/11/29)
         */
        function SpriteAnim2(opts){
            opts.frames = this._createFrames(opts.frameSize, opts.frameCount, opts.nCols);
            if(! 'basePath' in opts && SpriteAnim2.basePath !== SpriteAnim.basePath){
                opts.basePath = SpriteAnim2.basePath;
            }
            SpriteAnim.call(this, opts);
        }

        SpriteAnim2.basePath = SpriteAnim.basePath;

        SpriteAnim2.prototype = createObject(SpriteAnim.prototype, {

            _createFrames : function (frameSize, nFrames, nCols){
                //avoid calculating same info multiple times..
                var i = 0,
                    frames = [],
                    wid = frameSize.w,
                    hei = frameSize.h;
                while(i++ < nFrames){
                    //note that `i` will be 1 at first loop
                    frames.push({
                        x : toUInt( ((i % nCols) - 1) * wid),
                        y : toUInt( countSteps(i, nCols) * hei)
                    });
                }
                return frames;
            },

            _createElements : function(){
                var sprite = document.createElement('div');

                sprite.style.width = this._frameSize.w +'px';
                sprite.style.height = this._frameSize.h +'px';
                //not sure if it should have both classes..
                sprite.className = 'spriteAnim-frame spriteAnim-sprite';

                this._wrapper = this._sprite = sprite;
            },

            _renderFrame : function(n){
                var frame = this._frames[n - 1];
                this._sprite.style.backgroundPosition = '-'+ frame.x +'px -'+ frame.y +'px';
            }

        });

        return SpriteAnim2;
    }
);
