function LightClock(x, y, d, w, v, c, l = ()=>{}) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.w = w;
    this.v = v;
    this.c = c;
    this.l = l;
    this.h = 4;
    this.r = 4;
    this.photon_x = this.x + this.w / 2;
    this.photon_y = this.y + this.h + this.d - this.r;
    this.photon_v = this.v;
    this.paint = function(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillRect(this.x, this.y + this.h + this.d, this.w, this.h);
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.photon_x, this.photon_y, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
    }
    this.tick = function(t) {
        this.photon_y -= this.photon_v;
        if(this.photon_y <= this.y + this.h + this.r) {
            this.photon_v = - this.v;
            this.photon_y = this.y + this.h + this.r;
            this.l(false);
        } else if (this.photon_y >= this.y + this.h + this.d - this.r) {
            this.photon_v = this.v;
            this.photon_y = this.y + this.h + this.d - this.r;
            this.l(true);
        }
    }
}