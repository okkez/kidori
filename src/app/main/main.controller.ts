module kidori {
  'use strict';

  interface Board {
    id: number;
    depth: number;
    width: number;
  }

  export class MainController {

    public depth: number;
    public width: number;
    public nokogiri: number;
    public scale: number;
    public boards: Board[];
    public paddingX: number;
    public paddingY: number;

    /* @ngInject */
    constructor ($timeout: ng.ITimeoutService, toastr: Toastr) {
      this.depth = 900;
      this.width = 2400;
      this.nokogiri = 5;
      this.scale = 0.3;
      this.boards = [{
        id: Date.now(),
        depth: 0,
        width: 0
      }];
      this.paddingX = 10;
      this.paddingY = 10;
    }

    public append(): void {
      this.boards.push({
        id: Date.now(),
        depth: 0,
        width: 0
      });
    }

    public copy(): void {
      var lastIndex = this.boards.length - 1;
      var board: Board = angular.copy(this.boards[lastIndex]);
      board.id = Date.now();
      this.boards.push(board);
    }

    public delete(index: number): void {
      this.boards.splice(index, 1);
    }

    public up(index: number): void {
      var target = this.boards.splice(index, 1);
      this.boards.splice(index - 1, 0, target[0]);
    }

    public down(index: number): void {
      var target = this.boards.splice(index, 1);
      this.boards.splice(index + 1, 0, target[0]);
    }

    public render(): void {
      var xOffset = 0;
      var yOffset = 0;
      var xList: number[] = [];
      var canvas: HTMLCanvasElement = <HTMLCanvasElement>$('#board')[0];
      var context = canvas.getContext('2d');
      context.clearRect(xOffset, yOffset, this.getDepth(), this.getWidth());
      context.save();
      context.fillStyle = 'white';
      context.fillRect(xOffset, yOffset,
                       this.getDepth() + (this.paddingX * 2),
                       this.getWidth() + (this.paddingY * 2));
      xOffset += this.paddingX;
      yOffset += this.paddingY;
      context.strokeRect(xOffset, yOffset, this.getDepth(), this.getWidth());
      context.lineWidth = 1.0;
      context.strokeStyle = 'red';
      this.boards.forEach((board: Board) => {
        if (yOffset + board.width * this.scale > this.getWidth()) {
          xOffset += (Math.max.apply(null, xList) + this.nokogiri) * this.scale;
          yOffset = this.paddingY;
          if (xOffset + board.depth * this.scale > this.getDepth()) {
            toastr.error('板を取ることができませんでした。');
            return;
          }
        }
        context.strokeRect(xOffset,
                           yOffset,
                           board.depth * this.scale,
                           board.width * this.scale);
        context.lineWidth = 0.5;
        context.strokeStyle = 'black';
        context.strokeText(board.depth.toString(),
                           xOffset + (board.depth * this.scale) / 2,
                           yOffset);
        context.strokeText(board.width.toString(),
                           xOffset,
                           yOffset + (board.width * this.scale) / 2);
        xList.push(board.depth);
        yOffset += (board.width + this.nokogiri) * this.scale;
        context.lineWidth = 1.0;
        context.strokeStyle = 'red';
      });
      context.restore();
    }

    public download(): void {
      var canvas: HTMLCanvasElement = <HTMLCanvasElement>$('#board')[0];
      var url = canvas.toDataURL('image/png');
      url.replace('image/png', 'image/octet-stream');
      window.open(url, 'Download');
    }

    private getDepth(): number {
      return this.depth * this.scale;
    }

    private getWidth(): number {
      return this.width * this.scale;
    }
  }
}
