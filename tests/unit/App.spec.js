import { shallowMount, mount } from "@vue/test-utils";
import App from "@/App.vue";
import StartSettings from "@/components/StartSettings.vue";
import AfterGame from "@/components/AfterGame.vue";
import _ from "lodash";
import { doesNotReject } from "assert";

const fakeSettings = { players: ["Peter"], numberOfCards: 8 };

const newWrapper = function(startUp) {
  let wrapper = shallowMount(App, {});
  if (startUp) {
    wrapper.vm.start(fakeSettings);
  }
  return wrapper;
};

describe("when mounted", () => {
  let wrapper = newWrapper();
  it("start settings should be visible", () => {
    expect(wrapper.find(StartSettings).isVisible()).toBe(true);
  });
  it("game should not exist", () => {
    expect(wrapper.find("#game").exists()).toBe(false);
  });
});

describe("when start settings are submitted", () => {
  let wrapper = mount(App);
  wrapper.vm.start(fakeSettings);
  it("there should be a player", () => {
    expect(wrapper.vm.playerNames).toContain("Peter");
  });
  it("there should be 8 cards", () => {
    expect(wrapper.vm.cards.length).toBe(8);
  });
  it("there should be no flipped cards", () => {
    expect(wrapper.vm.flippedCards.length).toBe(0);
  });
  it("there should be 8 cards left", () => {
    expect(wrapper.vm.cardsLeft).toBe(8);
  });
  it("game should have started", () => {
    expect(wrapper.find("#game").exists()).toBe(true);
  });
  it("started should be true", () => {
    expect(wrapper.vm.started).toBe(true);
  });
  it("should return true or false when two cards are compared", () => {
    wrapper.vm.cards[0].isTurned = true;
    wrapper.vm.cards[1].isTurned = true;
    expect(typeof wrapper.vm.isMatch).toBe("boolean");
  });
});

describe("when two cards are flipped, they should be checked for equality", () => {
  let wrapper = mount(App);
  wrapper.vm.start(fakeSettings);
  wrapper.vm
  let sortedCards = wrapper.vm.cards.sort((a, b) => a.value > b.value);
  it("if they are the same, they should be removed", () => {
    jest.useFakeTimers();
    let cards = _.take(sortedCards, 2);
    cards.forEach(c => c.isTurned = true);
    wrapper.vm.performCheckForMatch();
    expect(cards.every(c => c.isRemovedFromPlay)).toBe(true);
  });
  it("if they are different, they should not be removed and turned back", (done) => {
    jest.useFakeTimers();
    let cards = Array();
    cards.push(sortedCards[2]);
    cards.push(sortedCards[4]);
    cards.forEach(c => c.isTurned = true);
    wrapper.vm.performCheckForMatch();
      expect(cards.every(c => !c.isRemovedFromPlay && !c.isTurned)).toBe(true);
      done()
  });
});

describe("when the game is finished", () => {
  let wrapper = newWrapper();
  wrapper.vm.started = true;
  wrapper.vm.isFinished = true;
  it("the after game dialog should be visible", () => {
    expect(wrapper.find(AfterGame).exists()).toBe(true);
  });

  describe("when resetting", () => {
    let wrapper = shallowMount(App, {
      stubs: {
        players: {
          render: () => {},
          methods: {
            reset: () => {}
          }
        }
      }
    });
    wrapper.vm.start(fakeSettings);
    wrapper.vm.isFinished = true;
    wrapper.vm.reset();
    it("the game should not be finished any more", () => {
      expect(wrapper.vm.isFinished).toBe(false);
    });
  });
});
