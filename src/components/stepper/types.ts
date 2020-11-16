export interface Step {
  text: string;
  active: boolean;
  link: Link | false;
}

export interface Link {
  href: string;
}

export interface Data {
  isOverflowing: boolean,
  currentStep: number,
  swipePosition: Point,
  isHorizontal: boolean | undefined,
  isTransitioning: boolean,
  temporaryStep: number | undefined
}

export interface Point {
  x: number;
  y: number;
}
