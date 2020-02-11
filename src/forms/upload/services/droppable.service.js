
class DroppableService {
  constructor() {
    this.counter = 0;
  }

  onDragEnter(event) {
    event.preventDefault();
    this.counter++;
    if (this.counter >= 1) {
      return true;
    }
    return false;
  }

  onDragLeave(event) {
    event.preventDefault();
    this.counter--;
    if (this.counter <= 0) {
      return false;
    }
    return true;
  }

  // eslint-disable-next-line
  onDragOver(event) {
    event.preventDefault();
  }

  // eslint-disable-next-line
  getDroppedFiles(event) {
    event.preventDefault();
    return event.dataTransfer.files;
  }

  reset() {
    this.counter = 0;
  }
}

export default DroppableService;
