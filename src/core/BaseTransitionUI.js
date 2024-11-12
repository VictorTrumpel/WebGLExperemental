export class BaseTransitionUI {
  #translation = [0, 0];
  #rotation = [0, 0];
  #angle = 0;
  #scale = [1, 1];

  #handleTranslationChange = () => null;
  #handleRotationChange = () => null;
  #handleAngleChange = () => null;

  #handleUiChange = () => null;

  constructor(canvasWidth, canvasHeight) {
    this.#setupXSliderUi(canvasWidth);
    this.#setupYSliderUi(canvasHeight);

    this.#setupRotationUi();
    this.#setupAngleUi();

    this.#setupScaleUi();
  }

  onTranslationChange(cb = new Function()) {
    this.#handleTranslationChange = cb;
  }

  onRotationChange(cb = new Function()) {
    this.#handleRotationChange = cb;
  }

  onAngleChange(cb = new Function()) {
    this.#handleAngleChange = cb;
  }

  onUiChange(cb = new Function()) {
    this.#handleUiChange = cb;
  }

  #emitUiChangeCb() {
    this.#handleUiChange(
      this.#translation,
      this.#rotation,
      this.#angle,
      this.#scale
    );
  }

  #setupXSliderUi(canvasWidth) {
    const updateXValueOnSlide = (_, ui) => {
      this.#translation[0] = ui.value;

      this.#handleTranslationChange(this.#translation);
      this.#emitUiChangeCb();
    };

    webglLessonsUI.setupSlider("#x", {
      slide: updateXValueOnSlide,
      max: canvasWidth,
    });
  }

  #setupYSliderUi(canvasHeight) {
    const updateYValueOnSlide = (_, ui) => {
      this.#translation[1] = ui.value;

      this.#handleTranslationChange(this.#translation);
      this.#emitUiChangeCb();
    };

    webglLessonsUI.setupSlider("#y", {
      slide: updateYValueOnSlide,
      max: canvasHeight,
    });
  }

  #setupRotationUi() {
    const updateRotationOnSlide = (_, ui) => {
      this.#rotation[0] = ui.x;
      this.#rotation[1] = ui.y;

      this.#handleRotationChange(this.#rotation);
      this.#emitUiChangeCb();
    };

    $("#rotation").gmanUnitCircle({
      width: 200,
      height: 200,
      value: 0,
      slide: updateRotationOnSlide,
    });
  }

  #setupAngleUi() {
    const updateAngleOnSlide = (_, ui) => {
      this.#angle = ui.value;

      this.#handleAngleChange(this.#angle);
      this.#emitUiChangeCb();
    };

    webglLessonsUI.setupSlider("#angle", {
      slide: updateAngleOnSlide,
      max: 360,
    });
  }

  #setupScaleUi() {
    const updateScaleX = (_, ui) => {
      this.#scale[0] = ui.value;

      this.#emitUiChangeCb();
    };

    const updateScaleY = (_, ui) => {
      this.#scale[1] = ui.value;

      this.#emitUiChangeCb();
    };

    webglLessonsUI.setupSlider("#scaleX", {
      value: this.#scale[0],
      slide: updateScaleX,
      min: -5,
      max: 5,
      step: 0.01,
      precision: 2,
    });

    webglLessonsUI.setupSlider("#scaleY", {
      value: this.#scale[1],
      slide: updateScaleY,
      min: -5,
      max: 5,
      step: 0.01,
      precision: 2,
    });
  }
}
