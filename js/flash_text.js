function FlashText(str, x, y, c, f, frames) {
    this.str = str;
    this.x = x;
    this.y = y;
    this.c = c;
    this.f = f;
    this.frames = frames;
    this.tick = (t)=>{};
    this.paint = function (ctx) {
        if (this.frames-- > 0) {
            ctx.font = this.f;
            ctx.fillStyle = this.c;
            ctx.fillText(str, this.x, this.y);
        } else {
            return true;
        }
    }
}
