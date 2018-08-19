import { createRecordsReducer, __toRecords } from "./";

describe("Records reducer", () => {
  describe("Adding records", () => {
    const reducer = createRecordsReducer({
      namespace: "SOME"
    });

    it("can add a single record", () => {
      expect(reducer({}, { type: "" })).toEqual({});
      expect(reducer({}, { type: "SOME/ADDED" })).toEqual({});
      expect(
        reducer(undefined, { type: "SOME/ADDED", data: { id: 1 } })
      ).toEqual({ ids: [1], records: { "1": { id: 1 } } });
      expect(
        reducer(__toRecords([{ id: 4 }, { id: 5 }]), {
          type: "SOME/ADDED",
          data: { id: 1 }
        })
      ).toEqual({
        ids: ["4", "5", 1],
        records: {
          "1": { id: 1 },
          "4": { id: 4 },
          "5": { id: 5 }
        }
      });
    });

    it("can add multiple records", () => {
      expect(reducer({}, { type: "" })).toEqual({});
      expect(reducer({}, { type: "SOME/ADDED" })).toEqual({});
      expect(
        reducer(undefined, { type: "SOME/ADDED", data: [{ id: 1 }, { id: 2 }] })
      ).toEqual({
        ids: ["1", "2"],
        records: { "1": { id: 1 }, "2": { id: 2 } }
      });
    });
  });

  describe("Updateing records", () => {
    const reducer = createRecordsReducer({
      namespace: "SOME"
    });

    it("can update a single record", () => {
      expect(reducer({}, { type: "" })).toEqual({});
      expect(reducer({}, { type: "SOME/UPDATED" })).toEqual({});
      expect(
        reducer(undefined, { type: "SOME/UPDATED", data: { id: 1 } })
      ).toEqual({ ids: [], records: {} });
      expect(
        reducer(__toRecords([{ id: 1 }, { id: 2 }]), {
          type: "SOME/UPDATED",
          data: { id: 1, name: "some name" }
        })
      ).toEqual(__toRecords([{ id: 1, name: "some name" }, { id: 2 }]));
    });

    it("can update multiple records", () => {
      expect(reducer({}, { type: "" })).toEqual({});
      expect(reducer({}, { type: "SOME/ADDED" })).toEqual({});
      expect(
        reducer(undefined, { type: "SOME/ADDED", data: [{ id: 1 }, { id: 2 }] })
      ).toEqual({
        ids: ["1", "2"],
        records: { "1": { id: 1 }, "2": { id: 2 } }
      });
    });
  });

  describe("Changeing records", () => {
    const reducer = createRecordsReducer({
      namespace: "SOME"
    });

    it("can update a single record", () => {
      expect(reducer({}, { type: "" })).toEqual({});
      expect(reducer(__toRecords([]), { type: "SOME/CHANGED" })).toEqual(
        __toRecords([])
      );
      expect(
        reducer(__toRecords([]), { type: "SOME/CHANGED", data: [{ id: 1 }] })
      ).toEqual(__toRecords([{ id: 1 }]));
    });

    it("can update multiple records", () => {
      expect(reducer({}, { type: "" })).toEqual({});
      expect(reducer({}, { type: "SOME/ADDED" })).toEqual({});
      expect(
        reducer(undefined, { type: "SOME/ADDED", data: [{ id: 1 }, { id: 2 }] })
      ).toEqual({
        ids: ["1", "2"],
        records: { "1": { id: 1 }, "2": { id: 2 } }
      });
    });
  });
});
