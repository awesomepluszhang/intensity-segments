import { IntensitySegments } from './IntensitySegments';

describe('IntensitySegments', () => {
  describe('add', () => {
    it('should initialize with an empty string', () => {
      const segments = new IntensitySegments();
      expect(segments.toString()).toBe('[]');
    });

    it('should add intensity correctly given invoked 3 add operations', () => {
      const segments = new IntensitySegments();
      segments.add(10, 30, 1);
      expect(segments.toString()).toBe('[[10,1],[30,0]]');

      segments.add(20, 40, 1);
      expect(segments.toString()).toBe('[[10,1],[20,2],[30,1],[40,0]]');

      segments.add(10, 40, -2);
      expect(segments.toString()).toBe('[[10,-1],[20,0],[30,-1],[40,0]]');
    });

    it('should add intensity correctly given invoked 4 add operations', () => {
      const segments = new IntensitySegments();
      segments.add(10, 30, 1);
      expect(segments.toString()).toBe('[[10,1],[30,0]]');

      segments.add(20, 40, 1);
      expect(segments.toString()).toBe('[[10,1],[20,2],[30,1],[40,0]]');

      segments.add(10, 40, -1);
      expect(segments.toString()).toBe('[[20,1],[30,0]]');

      segments.add(10, 40, -1);
      expect(segments.toString()).toBe('[[10,-1],[20,0],[30,-1],[40,0]]');
    });

    it('should add intensity correctly given invoked 2 same add operations', () => {
      const segments = new IntensitySegments();
      segments.add(10, 30, 1);
      expect(segments.toString()).toBe('[[10,1],[30,0]]');

      segments.add(10, 30, 1);
      expect(segments.toString()).toBe('[[10,2],[30,0]]');
    });

    it('should add intensity correctly given invoked increase first and then decrease', () => {
      const segments = new IntensitySegments();
      segments.add(10, 30, 1);
      expect(segments.toString()).toBe('[[10,1],[30,0]]');

      segments.add(10, 30, -1);
      expect(segments.toString()).toBe('[]');
    });
  });

  describe('set', () => {
    it('should set intensity correctly', () => {
      const segments = new IntensitySegments();
      expect(segments.toString()).toBe('[]');

      segments.set(10, 30, 1);
      expect(segments.toString()).toBe('[[10,1],[30,0]]');

      segments.set(20, 40, 1);
      expect(segments.toString()).toBe('[[10,1],[40,0]]');

      segments.set(10, 40, -2);
      expect(segments.toString()).toBe('[[10,-2],[40,0]]');
    });
  });

  describe('set/add throwing errors', () => {
    it('should throw error given from/to is infinity', () => {
      const segments = new IntensitySegments();
      expect(segments.toString()).toBe('[]');

      expect(() => segments.set(-Infinity, Infinity, 1)).toThrow('From and to must be finite numbers');
    });

    it('should throw error given from > to', () => {
      const segments = new IntensitySegments();
      expect(segments.toString()).toBe('[]');

      expect(() => segments.set(5, 2, 1)).toThrow('From must greater than to');
    });

    it('should throw error given intensity is infinity', () => {
      const segments = new IntensitySegments();
      expect(segments.toString()).toBe('[]');

      expect(() => segments.set(10, 20, Infinity)).toThrow('Intensity must be a finite number');
    });
  });
});
