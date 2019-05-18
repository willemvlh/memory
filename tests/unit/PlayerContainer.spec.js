import PlayerContainer from "@/components/PlayerContainer.vue";
import Player from "@/components/Player.vue";
import { mount } from "@vue/test-utils";

const newWrapper = function() {
  return mount(PlayerContainer, {
    propsData: {
      playerNames: ["Bob", "Jacques"],
      activePlayerIndex: 0,
      isFinished: false,
      cardsLeft: 6
    }
  });
};

describe("Player container", () => {
  let wrapper = newWrapper();
  let activePlayer = wrapper.vm.activePlayer;
  it("should contain 2 Player components", () => {
    expect(wrapper.findAll(Player).length).toBe(2);
  });
  it("the players attribute should be an array of 2 elements", () => {
    expect(wrapper.vm.players.length).toBe(2);
  });
  it("the active player should be the first one", () => {
    expect(activePlayer.name).toBe("Bob");
    expect(activePlayer.isAtTurn).toBe(true);
  });
  describe("when incrementing the score of the active player", () => {
    wrapper.vm.incrementScoreOfActivePlayer();
    it("the active player should now have some points", () => {
      expect(activePlayer.score > 0).toBe(true);
    });
  });
});

describe("getting the winners", () => {
  let wrapper = newWrapper();
  wrapper.vm.incrementScoreOfActivePlayer();
  wrapper.setProps({ isFinished: true });
  it("there should be a winner", () => {
    expect(wrapper.vm.winners).not.toBe(null);
  });
  it("it should not be tied", () => {
    expect(wrapper.vm.isTied).toBe(false);
  });
  it("the winners string should contain 'The winner is bob'", () => {
    expect(wrapper.vm.winnersAsString).toMatch(/the winner is bob/i);
  });
});
describe("when resetting", () => {
  let wrapper = newWrapper();
  wrapper.vm.incrementScoreOfActivePlayer();
  wrapper.vm.reset();
  let players = wrapper.findAll(Player).wrappers;
  it("all players should have a score and attempts of 0", () => {
    expect(players.every(p => p.vm.score === 0 && p.vm.attempts === 0)).toBe(
      true
    );
  });
  it("the game duration should be 0", () => {
    expect(wrapper.vm.timeElapsed).toBe(0);
  });
});
