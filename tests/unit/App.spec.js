import { shallowMount, mount } from '@vue/test-utils'
import App from '@/App.vue';
import StartSettings from '@/components/StartSettings.vue';
import AfterGame from '@/components/AfterGame.vue';

const newWrapper = function(){
    return shallowMount(App, {});
}

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
    let settings = {players: ["Peter"], numberOfCards: 8};
    wrapper.vm.start(settings);
    it("there should be a player", () => {
        expect(wrapper.vm.playerNames).toContain("Peter");
    });
    it("there should be 8 cards", () => {
        expect(wrapper.vm.cards.length).toBe(8);
    });
    it("game should have started", () => {
        expect(wrapper.find("#game").exists()).toBe(true);
    });
    it("started should be true", () => {
        expect(wrapper.vm.started).toBe(true);
    })
});

describe("when the game is finished", () => {
    let wrapper = newWrapper();
    wrapper.vm.started = true;
    wrapper.vm.isFinished = true;
    it("the after game dialog should be visible", () => {
        console.log(wrapper.html());
        expect(wrapper.find(AfterGame).exists()).toBe(true);
    });
});