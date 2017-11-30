var light_clock = {
    canvas: $("#light_clock_demo")[0],
    components: [],
    nextgen: [],
    tick: function() {
        this.frame++;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.components = $.grep(this.components, (comp, idx)=>{
            let r = comp.tick(this.frame);
            r |= comp.paint(this.context);
            return !r;
        }).concat(this.nextgen);
        this.nextgen = [];
    },
    start: function() {
        this.interval = setInterval(this.tick, 20);
    },
    flash: function(receive) {
        if(receive) {
            this.nextgen.push(new FlashText("Tick", 37, 145, "darkred", "16pt Arial", 15));
        }
    },
    init: function () {
        this.components.push(new LightClock(0, 0, 150, 50, 2, "red", this.flash.bind(this)));
        this.context = this.canvas.getContext("2d");
        this.frame = 0;
        this.tick = this.tick.bind(this);
    }
}
light_clock.init();
light_clock.start();