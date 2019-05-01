import { shallowMount } from '@vue/test-utils'
import Card from '@/components/Card.vue'
import {EventBus} from '@/components/EventBus.js';
import { AssertionError } from 'assert';


function newVM(){
  return shallowMount(Card, {
    propsData: {
      value: "neymar.png"
    }
  })
}

const wrapper_const = newVM();

describe('Card.vue', () => {
  let wrapper = newVM();
  describe("when mounted", () => {
    it('should be unturned', () => {
      expect(wrapper.vm.isTurned).toBe(false);
    });
    it('should not be removed', () => {
      expect(wrapper.vm.isRemovedFromPlay).toBe(false);
    });
    it('should emit a cardCreated event', () => {
      expect(wrapper.emitted().cardCreated).toBeDefined();
    })
  });

  describe("on settings update", () => {
    let wrapper = newVM();
    let settings = {test: "settings"};
    EventBus.$emit("settingsUpdate", settings);
    it("settings should be updated", () => {
      expect(wrapper.vm.settings).toBe(settings);
    })
  })
  describe("when clicked", () => {
    let flippedWrapper  = newVM();
    flippedWrapper.trigger("click");
    it('should be turned around', () => {
      expect(flippedWrapper.vm.isTurned).toBe(true);
    });
    it('should emit a cardFlip event', () => {
      expect(flippedWrapper.emitted().cardFlip).toBeDefined();
    });
    describe("when it is clicked again", () => {
      let wrapper = newVM();
      wrapper.trigger("click");
      wrapper.trigger("click");
      it("should now be unturned", () => {
        expect(wrapper.vm.isTurned).toBe(false);
      });
    });
    describe("when it is already removed", () => {
      let newWrapper = newVM();
      newWrapper.vm.isRemovedFromPlay = true;
      it('should not do anything when flipped', () => {
        newWrapper.vm.flip();
        expect(newWrapper.vm.isTurned).toBe(false);
        expect(newWrapper.emitted().cardFlip).toBeUndefined();
      });
    });
  });

  describe("when removed", () =>{
    wrapper_const.vm.removeFromPlay();
    it('should be removed from play', () => {
      expect(wrapper_const.vm.isRemovedFromPlay).toBe(true);
    })
  });

  describe("when reset", () => {
    let wrapper = newVM();
    wrapper.vm.flip();
    wrapper.vm.reset();
    it("should be not removed from play", () => {
      expect(wrapper.vm.isRemovedFromPlay).toBe(false);
    });
    it("should be unturned", () => {
      expect(wrapper.vm.isTurned).toBe(false);
    });
  });


});
