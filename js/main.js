$(".square").each((idx, el) => {
    $(el).height($(el).width());
})

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
    resetClock: function() {
        let move = this.components[1];
        if(move.x > $(this.canvas).width() - move.d) {
            move.x = 150;
            move.resetLines();
        }
    },
    start: function () {
        this.interval = setInterval(this.tick, 20);
    },
    init: function () {
        $(this.canvas).attr("height", $(this.canvas).height());
        $(this.canvas).attr("width", $(this.canvas).width());
        this.components.push(new LightClock(60, 100, 150, 50, 2, "blue"));
        this.components.push(new LightClock(150, 100, 150, 50, 2, "red", this.resetClock.bind(this)));
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
    resetClock: function () {
        let move = this.components[1];
        if (move.x > $(this.canvas).width() - move.d) {
            move.x = 150;
            move.resetLines();
        }
    },
    start: function () {
        this.interval = setInterval(this.tick, 20);
    },
    init: function () {
        $(this.canvas).attr("height", $(this.canvas).height());
        $(this.canvas).attr("width", $(this.canvas).width());
        this.components.push(new LightClock(60, 100, 150, 50, 2, "blue"));
        this.components.push(new LightClock(150, 100, 150, 50, Math.sqrt(4-1.5*1.5), "red", this.resetClock.bind(this)));
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
        $(this.canvas).css("background-position-x", (parseFloat($(this.canvas).css("background-position-x").replace("px","")) - 1.5) + "px");
        this.components[0].x -= 1.5;
    },
    start: function () {
        this.interval = setInterval(this.tick, 20);
    },
    resetClock: function () {
        let move = this.components[0];
        if (move.x < move.d) {
            move.x = 60+512;
            move.resetLines();
            $(this.canvas).css("background-position-x", "0px");
        }
    },
    init: function () {
        $(this.canvas).attr("height", $(this.canvas).height());
        $(this.canvas).attr("width", $(this.canvas).width());
        this.components.push(new LightClock(60 + 512, 100, 150, 50, Math.sqrt(4 - 1.5 * 1.5), "blue", this.resetClock.bind(this)));
        this.components.push(new LightClock(150+512, 100, 150, 50, 2, "red"));
        this.context = this.canvas.getContext("2d");
        this.frame = 0;
        this.tick = this.tick.bind(this);
    }
}
symmetry.init();
symmetry.start();

var lightspeed = {
    canvas: $("#light_speed_demo")[0],
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
        let move = this.components[1];
        move.x += 2;
        if(move.x > $(this.canvas).width() - move.d) {
            move.x = 150;
            move.resetLines();
        }
    },
    start: function () {
        this.interval = setInterval(this.tick, 20);
    },
    init: function () {
        $(this.canvas).attr("height", $(this.canvas).height());
        $(this.canvas).attr("width", $(this.canvas).width());
        this.components.push(new LightClock(60, 100, 150, 50, 2, "blue"));
        this.components.push(new LightClock(150, 100, 150, 50, 0, "red"));
        this.components[1].photon_y -= 0.1;
        this.context = this.canvas.getContext("2d");
        this.frame = 0;
        this.tick = this.tick.bind(this);
    }
}
lightspeed.init();
lightspeed.start();

var curving = {
    canvas: $("#curving_demo")[0],
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
        let curved = this.components[1];
        let y1 = curved.y + curved.h + curved.r;
        let y2 = y1 + curved.d - 2*curved.r;
        let dy = curved.photon_y - y1;
        let amp = this.grid*0.65;
        curved.photon_x = -amp/2 * Math.cos(dy * (2*Math.PI)/(y2-y1)) + amp / 2

        let vx = amp/2*(2*Math.PI)/(y2-y1)*Math.sin(dy*(2*Math.PI)/(y2-y1));
        let vy = Math.sqrt(this.components[0].v * this.components[0].v - vx*vx);
        curved.photon_v = vy * Math.sign(curved.photon_v);
    },
    start: function () {
        this.interval = setInterval(this.tick, 20);
    },
    init: function () {
        $(this.canvas).attr("height", $(this.canvas).height());
        $(this.canvas).attr("width", $(this.canvas).width());
        this.grid = $(this.canvas).width() / 8;
        this.components.push(new LightClock(0.5*this.grid, 2*this.grid-2, 4*this.grid-4, 1*this.grid, 1.5, "blue"));
        this.components.push(new LightClock(2.5*this.grid, 2*this.grid-2, 4*this.grid-4, 1*this.grid, 1.5, "red"));
        this.components[1].photon_y -= 0.1;
        this.context = this.canvas.getContext("2d");
        this.frame = 0;
        this.tick = this.tick.bind(this);
    }
}
curving.init();
curving.start();