import { shallowMount } from '@vue/test-utils'
import Card from '@/components/Card.vue'

function newVM(){
  return shallowMount(Card, {
    propsData: {
      value: "neymar.png"
    }
  })
}

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
  describe("when clicked", () => {
    let flippedWrapper  = newVM();
    flippedWrapper.trigger("click");
    it('should be flipped', () => {
      expect(flippedWrapper.vm.isTurned).toBe(true);
    });
    it('should emit a cardFlip event', () => {
      expect(flippedWrapper.emitted().cardFlip).toBeDefined();
    });
  });
  describe("when removed", () =>{
    let wrapper = newVM();
    wrapper.vm.removeFromPlay();
    it('should be removed from play', () => {
      expect(wrapper.vm.isRemovedFromPlay).toBe(true);
    })
  })
});
