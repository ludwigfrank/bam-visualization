import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const TYPE = 'Circle';
export const behavior = {
  customDisplayObject: props => new PIXI.Graphics(),
  customApplyProps: function(instance, oldProps, newProps) {
      const { fill, x, y, radius } = newProps;
      instance.clear();
      instance.beginFill(fill);
      instance.drawCircle(x, y, radius);
      instance.endFill();
  }
};

export default CustomPIXIComponent(behavior, TYPE);
