type Point = number;
type Intensity = number;

export class IntensitySegments {
  // An array to store the points of the segments
  private points: Point[] = [];
  private segments = new Map<Point, Intensity>();

  /**
   * Add intensity to the segments in range of [from, to)
   * @param from - start of the segment
   * @param to - end of the segment (exclusive)
   * @param amount - intensity to add
   * @returns the instance self
   * @public
   */
  add(from: Point, to: Point, amount: Intensity): IntensitySegments {
    const fromIndex = this.insert(from);
    const toIndex = this.insert(to, fromIndex + 1);

    for (let i = fromIndex; i < toIndex; i++) {
      const point = this.points[i];
      const currentIntensity = this.getIntensity(i) + amount;
      this.segments.set(point, currentIntensity);
    }

    this.removeUnnecessary(fromIndex, toIndex);
    return this;
  }

  /**
   * Set intensity to the segments in range of [from, to)
   * @param from - start of the segment
   * @param to - end of the segment (exclusive)
   * @param amount - intensity to set
   * @returns the instance self
   * @public
   */
  set(from: Point, to: Point, amount: Intensity): IntensitySegments {
    const fromIndex = this.insert(from, 0, false);
    const toIndex = this.insert(to, fromIndex + 1, false);

    for (let i = fromIndex; i < toIndex; i++) {
      const point = this.points[i];
      this.segments.set(point, amount);
    }

    this.removeUnnecessary(fromIndex, toIndex);
    return this;
  }

  /**
   * Get the JSON string of segments
   * @returns the JSON string of segments
   * @public
   */
  toString() {
    const result = this.points.map((point) => [point, this.segments.get(point)]);
    return JSON.stringify(result);
  }

  /**
   * Binary search on points and returns either the index of the target point or the insertion index if the target is not found
   * @param target - the search point
   * @param left - left boundary
   * @param right - right boundary
   * @returns index
   * @internal
   */
  private searchFromPoints(target: Point, left = 0, right = this.points.length - 1): number {
    while (left <= right) {
      const mid: number = Math.floor((left + right) / 2);
      const item: Point = this.points[mid];

      if (item === target) {
        return mid;
      } else if (item < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return left;
  }

  /**
   * Insert the point to points and segments, and return the insertion index of the point
   * @param point - the point you want to insert
   * @param left - start index to calculate the insertion index
   * @param isAdd - a flag to indicate whether this is a add call or not
   * @returns insertion index of the point
   * @internal
   */
  private insert(point: Point, left: Intensity = 0, isAdd: boolean = true): number {
    const index = this.searchFromPoints(point, left, this.points.length - 1);
    if (point !== this.points[index]) {
      // new point, insert to points at a correct index
      this.points.splice(index, 0, point);
    }

    if (!this.segments.has(point)) {
      // new point, calc and store the intensity of the point
      const intensity = isAdd ? this.getIntensity(index) : 0;
      this.segments.set(point, intensity);
    }
    return index;
  }

  /**
   * Remove duplicated points from points and segments in range of `[fromIndex, toIndex]`
   * @param fromIndex - start index
   * @param toIndex - end index
   * @internal
   */
  private removeUnnecessary(fromIndex: number, toIndex: number) {
    let cursor = toIndex;
    while (cursor >= fromIndex) {
      const point = this.points[cursor];
      if (this.getIntensity(cursor) === this.getIntensity(cursor - 1)) {
        this.points.splice(cursor, 1);
        this.segments.delete(point);
      }
      cursor--;
    }
  }

  /**
   * Get the intensity of a point from the segments
   * @param index
   * @returns intensity
   * @internal
   */
  private getIntensity(index: number): Intensity {
    let cursor = index;
    while (cursor > -1) {
      const point = this.points[cursor];
      const intensity = this.segments.get(point);
      if (intensity !== undefined) {
        return intensity;
      }
      cursor--;
    }
    return 0;
  }
}
