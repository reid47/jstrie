import { Trie } from '../lib/trie';
import { expect } from 'chai';

describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  describe('when initialized', () => {
    it('exists', () => {
      expect(trie).to.be.ok;
    });

    it('does not contain any words', () => {
      expect(trie.find('apple')).to.be.false;
      expect(trie.find('test')).to.be.false;
    });
  });

  describe('when the word "apple" is added', () => {
    beforeEach(() => {
      trie.insert('apple');
    });

    it('contains the word "apple"', () => {
      expect(trie.find('apple')).to.be.true;
    });

    it('does not contain the word "APPLE" (case-sensitive)', () => {
      expect(trie.find('APPLE')).to.be.false;
    });

    it('does not contain the word "test"', () => {
      expect(trie.find('test')).to.be.false;
    });

    it('does not contain the word "app"', () => {
      expect(trie.find('app')).to.be.false;
    });

    it('does not contain the word "applet"', () => {
      expect(trie.find('applet')).to.be.false;
    });

    describe('and then the word "app" is added', () => {
      beforeEach(() => {
        trie.insert('app');
      });

      it('contains the word "app"', () => {
        expect(trie.find('app')).to.be.true;
      });
    });
  });

  describe('when .insert is called with invalid arguments', () => {
    beforeEach(() => {
      trie.insert('');
      trie.insert(undefined);
    });

    it('does not contain any words', () => {
      expect(trie.find('')).to.be.false;
      expect(trie.find(undefined)).to.be.false;
    });
  });

  describe('#toJsonString method', () => {
    it('is an empty object by default', () => {
      expect(trie.toJsonString()).to.equal('{}');
    });

    describe('when words are added', () => {
      beforeEach(() => {
        trie.insert('apple');
        trie.insert('hello');
      });

      it('lists the words in the trie correctly', () => {
        expect(trie.toJsonString()).to.equal('{"a":{"p":{"p":{"l":{"e":{"$":1}}}}},"h":{"e":{"l":{"l":{"o":{"$":1}}}}}}');
      });
    });
  });

  describe('#toJsString method', () => {
    it('is an empty exported object by default', () => {
      expect(trie.toJsString()).to.equal('module.exports={};');
    });

    describe('when words are added', () => {
      beforeEach(() => {
        trie.insert('apple');
        trie.insert('hello');
      });

      it('lists the words as an exported module correctly', () => {
        expect(trie.toJsString()).to.equal('module.exports={a:{p:{p:{l:{e:{$:1}}}}},h:{e:{l:{l:{o:{$:1}}}}}};');
      });
    });
  });

  describe('#fromJsonString method', () => {
    let jsonTrie, newTrie;

    beforeEach(() => {
      trie.insert('apple');
      trie.insert('hello');
      trie.insert('test');
      jsonTrie = trie.toJsonString();
      newTrie = Trie.fromJsonString(jsonTrie);
    });

    it('recreates a trie correctly', () => {
      expect(newTrie.find('apple')).to.be.true;
      expect(newTrie.find('hello')).to.be.true;
      expect(newTrie.find('test')).to.be.true;
      expect(newTrie.find('nonexistent')).to.be.false;
    });
  });
});