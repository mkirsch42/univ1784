function FlashText(str, x, y, c, f, frames) {
    this.str = str;
    this.x = x;
    this.y = y;
    this.c = c;
    this.f = f;
    this.frames = frames;
    this.tick = (t)=>{};
    this.paint = function(ctx) {
        if(this.frames-- > 0) {
            ctx.font = this.f;
            ctx.fillStyle = this.c;
            ctx.fillText(str, this.x, this.y)
        }
    }
}

var light_clock = {
    canvas: $("#light_clock_demo")[0],
    context: null,
    interval: null,
    frame: null,
    components: [],
    tick: function() {
        this.frame++;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        $.each(this.components, (idx, comp)=>{
            comp.tick(this.frame);
            comp.paint(this.context);
        });
    },
    start: function() {
        this.interval = setInterval(this.tick, 20);
    },
    flash: function(receive) {
        if(receive) {
            this.components.push(new FlashText("Tick", 110, 210, "dark-red", "16pt Arial", 15));
        }
    },
    init: function () {
        this.components.push(new LightClock(50, 50, 150, 50, 2, "red", this.flash.bind(this)));
        this.context = this.canvas.getContext("2d");
        this.frame = 0;
        this.tick = this.tick.bind(this);
    }
}
light_clock.init();
light_clock.start();