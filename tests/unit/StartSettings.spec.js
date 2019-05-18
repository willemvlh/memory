import StartSettings from "@/components/StartSettings.vue";
import FormItem from "@/components/FormItem.vue";
import { mount } from "@vue/test-utils";

const newWrapper = function() {
  return mount(StartSettings);
};
describe("When having 3 nameless players", () => {
  let wrapper = newWrapper();
  wrapper.setData({ numberOfPlayers: 3 });
  it("there should be 3 player form-items", () => {
    expect(wrapper.findAll(FormItem).length).toBe(3);
  });
  it("there should be 3 players", () => {
    expect(wrapper.vm.pl.length).toBe(3);
  });
  it("it should not validate", () => {
    expect(wrapper.vm.validateSettings()).toBe(false);
  });
  it("clicking the button should not emit an event", () => {
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted().start).toBeFalsy();
  });
});

describe("when having 2 named players", () => {
  let wrapper = newWrapper();
  wrapper.setData({ numberOfPlayers: 3 });
  wrapper.setData({ numberOfPlayers: 2 });
  let formItems = wrapper.findAll(FormItem);
  it("there should be 2 form items", () => {
    expect(formItems.length).toBe(2);
  });
  describe("setting their names", () => {
    formItems.wrappers.forEach(w => w.setData({ name: "Bob" }));
    it("it should now validate", () => {
      expect(wrapper.vm.validateSettings()).toBe(true);
    });
    describe("when clicking the button", () => {
      wrapper.find("button").trigger("click");
      it("a start event should be emitted", () => {
        expect(wrapper.emitted().start).toBeTruthy();
      });
    });
  });
});
