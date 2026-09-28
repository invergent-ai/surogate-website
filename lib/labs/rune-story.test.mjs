import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(HERE, '..', '..', 'public');
const story = JSON.parse(readFileSync(path.join(HERE, 'rune-story.json'), 'utf8'));

const sumsToOne = (probs, label) =>
  assert.ok(Math.abs(Object.values(probs).reduce((a, b) => a + b, 0) - 1) < 1e-6, label);

test('the story was recorded from real runs', () => {
  assert.match(story.recorded, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(story.model, 'rune-v3');
});

test('ticket scene: three typed questions, real distributions', () => {
  const { request, answers, ms } = story.ticket;
  assert.deepEqual(Object.keys(request.questions), ['refund', 'tone', 'urgency']);
  assert.equal(answers.refund.type, 'noul');
  sumsToOne(answers.tone.probabilities, 'tone');
  sumsToOne(answers.urgency.probabilities, 'urgency');
  assert.ok(ms > 0 && ms < 30000);
});

test('sees scene: an image, a zoom path of boxes, and a point inside the last box', () => {
  const { image, size, task, steps, point } = story.sees;
  assert.ok(existsSync(path.join(PUBLIC, image)), image);
  assert.ok(steps.length >= 2 && steps.length <= 3);
  for (const s of steps) {
    sumsToOne(s.probabilities, 'cell');
    const [x0, y0, x1, y1] = s.box;
    assert.ok(0 <= x0 && x0 < x1 && x1 <= size[0] && 0 <= y0 && y0 < y1 && y1 <= size[1]);
  }
  const [x0, y0, x1, y1] = steps.at(-1).next;
  assert.ok(x0 <= point[0] && point[0] <= x1 && y0 <= point[1] && point[1] <= y1);
  assert.ok(task.length > 3);
});

test('thinking scene: a question that was unsure in one pass and thought before answering', () => {
  const { request, answer, onepass } = story.thinking;
  assert.equal(request.thinking, true);
  assert.ok(answer.thinking.tokens > 0);
  const top = Math.max(...Object.values(onepass.probabilities));
  assert.ok(top < 0.7, `one-pass confidence ${top} should be under the 0.7 gate`);
  sumsToOne(answer.probabilities, 'final');
});
