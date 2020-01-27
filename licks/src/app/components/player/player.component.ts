import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  ViewChild,
  ElementRef,
  OnChanges,
  AfterViewInit
} from "@angular/core";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit, OnChanges {
  constructor() {}
  @Input() fileUrl: string;
  @ViewChild("player", { static: false }) player: ElementRef<HTMLMediaElement>;

  playerIsOnSlow = false;
  playerIsLooping = false;
  playerIsPaused = false;
  playerIsPlaying = false;

  onColor = "#419c67";
  offColor = "#000";
  tabAudio = "";

  /** reset when lick changes */
  ngOnChanges() {
    this.tabAudio = this.fileUrl;
    this.playerIsPlaying = false;
    this.playerIsOnSlow = false;
    this.playerIsLooping = false;
    this.playerIsPaused = false;
  }
  ngOnInit() {
    setTimeout(() => {
      /** give the player time to load then and the ENDED event listener to flip the isPLaying flag */
      this.player.nativeElement.addEventListener("ended", () => {
        if (!this.playerIsLooping) {
          this.playerIsPlaying = false;
        }
      });
    }, 1000);
  }

  playAudio = () => {
    this.player.nativeElement.play();
    this.playerIsPaused = false;
    this.playerIsPlaying = true;
  };
  pauseAudio = () => {
    this.player.nativeElement.pause();
    this.playerIsPaused = true;
    this.playerIsPlaying = false;
  };
  setAudioSpeed = () => {
    if (this.playerIsOnSlow) {
      this.player.nativeElement.playbackRate = 1.0;
      this.playerIsOnSlow = false;
    } else {
      this.player.nativeElement.playbackRate = 0.65;
      this.playerIsOnSlow = true;
    }
  };
  setAudioLooping = () => {
    if (this.playerIsLooping === true) {
      this.player.nativeElement.loop = false;
      this.playerIsLooping = false;
    } else {
      this.player.nativeElement.loop = true;
      this.playerIsLooping = true;
    }
  };
  restartAudio = () => {
    this.player.nativeElement.load();
    this.player.nativeElement.play();
    this.playerIsPlaying = true;
    this.playerIsPaused = false;
    if (this.playerIsOnSlow) {
      this.player.nativeElement.playbackRate = 0.65;
    }
  };
}
