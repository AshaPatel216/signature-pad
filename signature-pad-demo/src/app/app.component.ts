import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('sigPad') sigPad;

  signatureElement: any;
  context: any;
  isDrawing: boolean;
  img: string;
  isSignatureCreated: boolean;

  constructor() {
    this.img = '';
    this.isDrawing = false;
    this.isSignatureCreated = false;
  }

  ngOnInit(): void {   
  }

  ngAfterViewInit(): void {
    this.signatureElement = this.sigPad.nativeElement;
    this.context = this.signatureElement.getContext('2d');
    this.context.strokeStyle = '#f75a31';
  }

  /**
   * Call on mouse up.
   * @param e Event on mouse up
   */
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e) {
    this.isDrawing = false;
  }

  /**
   * Call on mouse down.
   * @param e Event on 
   */
  onMouseDown(e) {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  /**
   * Call on mouse move.
   * @param e Event on mouse move
   */
  onMouseMove(e) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
      this.isSignatureCreated = true;
    }
  }

  /**
   * Get the relative coordinate on mouse down or on mouse up.
   * It will help draw the lines based on fetched coordinates.
   * @param event
   */
  private relativeCoords(event) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return { x: x, y: y };
  }

  /**
   * Clear the Signature
   */
  clearSignature(): void {
    this.context.clearRect(0, 0, this.signatureElement.width, this.signatureElement.height);
    this.context.beginPath();
  }

  /**
   * Save the signature
   */
  saveSignature(): void{
    this.img = this.signatureElement.toDataURL("image/png");
  }

}
