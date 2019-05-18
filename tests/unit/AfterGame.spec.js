import AfterGame from "@/components/AfterGame.vue";
import { shallowMount } from "@vue/test-utils";

describe("After game dialogue", () => {
  let wrapper = shallowMount(AfterGame, {
    propsData: {
      winners: "Bob is the winner"
    }
  });
  test("it should display the winner", () => {
    expect(wrapper.find("p").text()).toEqual("Bob is the winner");
  });
  test("clicking the button should emit an event", () => {
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted().reset).toBeTruthy();
  });
});
