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
    this.photon_y = this.y + this.h + this.d - this.r;
    this.photon_v = this.v;
    this.line1 = [this.x + this.w / 2, this.photon_y, this.x + this.w / 2, this.photon_y]
    this.line2 = this.line1;
    this.paint = function(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillRect(this.x, this.y + this.h + this.d, this.w, this.h);
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x + this.w / 2, this.photon_y, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = this.c;
        ctx.lineWidth = 2;
        ctx.moveTo(this.line1[0], this.line1[1]);
        ctx.lineTo(this.line1[2], this.line1[3]);
        ctx.moveTo(this.line2[0], this.line2[1]);
        ctx.lineTo(this.line2[2], this.line2[3]);
        ctx.stroke();
    }
    this.tick = function(t) {
        this.photon_y -= this.photon_v;
        if(this.photon_y <= this.y + this.h + this.r) {
            this.photon_v = - this.v;
            this.photon_y = this.y + this.h + this.r;
            this.line2 = this.line1.slice(0);
            this.line1[0] = this.x + this.w / 2;
            this.line1[1] = this.photon_y;
            this.l(false);
        } else if (this.photon_y >= this.y + this.h + this.d - this.r) {
            this.photon_v = this.v;
            this.photon_y = this.y + this.h + this.d - this.r;
            this.line2 = this.line1.slice(0);
            this.line1[0] = this.x + this.w / 2;
            this.line1[1] = this.photon_y;
            this.l(true);
        }
        this.line1[2] = this.x + this.w / 2;
        this.line1[3] = this.photon_y;
    }
}