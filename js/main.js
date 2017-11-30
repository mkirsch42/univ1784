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

var moving = {
    canvas: $("#moving_demo")[0],
    components: [],
    nextgen: [],
    tick: function () {
        this.frame++;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.components = $.grep(this.components, (comp, idx) => {
            let r = comp.tick(this.frame);
            r |= comp.paint(this.context);
            return !r;
        }).concat(this.nextgen);
        this.nextgen = [];
        this.components[1].x += 1.5;
    },
    start: function () {
        this.interval = setInterval(this.tick, 20);
    },
    init: function () {
        $(this.canvas).attr("height", $(this.canvas).height());
        $(this.canvas).attr("width", $(this.canvas).width());
        this.components.push(new LightClock(60, 100, 150, 50, 2, "blue"));
        this.components.push(new LightClock(150, 100, 150, 50, 2, "red"));
        this.context = this.canvas.getContext("2d");
        this.frame = 0;
        this.tick = this.tick.bind(this);
    }
}
moving.init();
moving.start();

var slower = {
    canvas: $("#slower_demo")[0],
    components: [],
    nextgen: [],
    tick: function () {
        this.frame++;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.components = $.grep(this.components, (comp, idx) => {
            let r = comp.tick(this.frame);
            r |= comp.paint(this.context);
            return !r;
        }).concat(this.nextgen);
        this.nextgen = [];
        this.components[1].x += 1.5;
    },
    start: function () {
        this.interval = setInterval(this.tick, 20);
    },
    init: function () {
        $(this.canvas).attr("height", $(this.canvas).height());
        $(this.canvas).attr("width", $(this.canvas).width());
        this.components.push(new LightClock(60, 100, 150, 50, 2, "blue"));
        this.components.push(new LightClock(150, 100, 150, 50, Math.sqrt(4-1.5*1.5), "red"));
        this.context = this.canvas.getContext("2d");
        this.frame = 0;
        this.tick = this.tick.bind(this);
    }
}
slower.init();
slower.start();

var symmetry = {
    canvas: $("#symmetry_demo")[0],
    components: [],
    nextgen: [],
    tick: function () {
        this.frame++;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.components = $.grep(this.components, (comp, idx) => {
            let r = comp.tick(this.frame);
            r |= comp.paint(this.context);
            return !r;
        }).concat(this.nextgen);
        this.nextgen = [];
        console.log(1.5+$(this.canvas).css("background-position-x").replace("px", "") );
        $(this.canvas).css("background-position-x", (parseFloat($(this.canvas).css("background-position-x").replace("px","")) - 1.5) + "px");
        this.components[0].x -= 1.5;
    },
    start: function () {
        this.interval = setInterval(this.tick, 20);
    },
    init: function () {
        $(this.canvas).attr("height", $(this.canvas).height());
        $(this.canvas).attr("width", $(this.canvas).width());
        this.components.push(new LightClock(60 + 512, 100, 150, 50, Math.sqrt(4 - 1.5 * 1.5), "blue"));
        this.components.push(new LightClock(150+512, 100, 150, 50, 2, "red"));
        this.context = this.canvas.getContext("2d");
        this.frame = 0;
        this.tick = this.tick.bind(this);
    }
}
symmetry.init();
symmetry.start();