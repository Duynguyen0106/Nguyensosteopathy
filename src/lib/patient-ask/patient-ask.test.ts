import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { matchLocalAnswer } from "@/lib/patient-ask/local-answers";
import {
  checkMessagesSafety,
  checkPatientAskSafety,
  filterModelAnswer,
} from "@/lib/patient-ask/safety";

describe("checkPatientAskSafety", () => {
  const hits = [
    "I have crushing pressure in my chest",
    "I cant breathe properly",
    "numbness between my legs and leaking urine",
    "I want to die",
    "kill myself",
    "overdose",
    "anaphylaxis",
    "facial drooping and arm weakness",
    "severe headache worst of my life",
    "sudden chest pain emergency",
  ];

  for (const text of hits) {
    it(`blocks: ${text}`, () => {
      const result = checkPatientAskSafety(text);
      assert.equal(result.blocked, true);
      if (result.blocked) assert.equal(result.handoff, "urgent");
    });
  }

  it("allows ordinary fee question", () => {
    assert.equal(
      checkPatientAskSafety("How much is an initial visit?").blocked,
      false,
    );
  });

  it("checks all user turns", () => {
    const result = checkMessagesSafety([
      { role: "user", content: "I have chest pain emergency" },
      { role: "assistant", content: "Please seek urgent care." },
      { role: "user", content: "ok thanks" },
    ]);
    assert.equal(result.blocked, true);
  });
});

describe("matchLocalAnswer", () => {
  it("answers fees", () => {
    const hit = matchLocalAnswer("How much is an initial visit?");
    assert.ok(hit);
    assert.match(hit!.answer, /£75/);
  });

  it("does not treat open-to as opening hours", () => {
    assert.equal(
      matchLocalAnswer("I am open to trying osteopathy for my neck"),
      null,
    );
  });

  it("answers cancellation before book intent", () => {
    const hit = matchLocalAnswer("I booked yesterday, can I cancel?");
    assert.ok(hit);
    assert.match(hit!.answer, /24 hours/i);
    assert.equal(hit!.handoff, "whatsapp");
  });

  it("does not treat bare Charlton as address intent", () => {
    assert.equal(
      matchLocalAnswer("Is Charlton Village busy on Saturdays?"),
      null,
    );
  });

  it("answers location phrases", () => {
    const hit = matchLocalAnswer("Where are you and what is the address?");
    assert.ok(hit);
    assert.match(hit!.answer, /Village Pharmacy/);
  });

  it("answers opening hours intent", () => {
    const hit = matchLocalAnswer("What are your opening hours?");
    assert.ok(hit);
    assert.match(hit!.answer, /9:00am/i);
  });
});

describe("filterModelAnswer", () => {
  it("blocks diagnostic-sounding model output", () => {
    const filtered = filterModelAnswer(
      "You likely have a herniated disc. Rest and take this medication.",
    );
    assert.equal(filtered.handoff, "urgent");
    assert.match(filtered.answer, /999/);
  });

  it("strips HANDOFF tokens and keeps book handoff", () => {
    const filtered = filterModelAnswer(
      "You can book online at /book.\n\nHANDOFF:book",
    );
    assert.equal(filtered.handoff, "book");
    assert.doesNotMatch(filtered.answer, /HANDOFF/);
    assert.match(filtered.answer, /not a diagnosis/i);
  });
});
