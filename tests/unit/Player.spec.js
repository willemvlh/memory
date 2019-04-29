import { shallowMount } from '@vue/test-utils';
import Player from '@/components/Player.vue';

let newPlayer = function(){
    return shallowMount(Player, { propsData: {name: "Willem"}})
};

describe('when mounted', () => {
    let player = newPlayer();
    it('should have a score of 0', () => {
        expect(player.vm.score).toBe(0);
    });
    it('should have 0 attempts', () => {
        expect(player.vm.attempts).toBe(0);
    });
    it('should have emitted an event', () => {
        player.emitted('playerCreated');
    });
});

describe('when attempting', () => {
    let player = newPlayer();
    player.vm.increaseAttempts();
    it('should have 1 attempt', () => {
        expect(player.vm.attempts).toBe(1);
    });
    it('should have 0 success rate', () => {
        expect(player.vm.successRate).toBe(0);
    });
});

describe('when scoring', () => {
    let player = newPlayer();
    player.vm.increaseAttempts();
    player.vm.increaseScore();
    it('should have 1 attempt', () => {
        expect(player.vm.attempts).toBe(1);
    });
    it('should have 2 points', () => {
        expect(player.vm.score).toBe(2);
    });
    it('should have success rate of 100', () => {
        expect(player.vm.successRate).toBe(100);
    })
});

describe('when resetting', () => {
    let player = newPlayer();
    player.vm.increaseAttempts();
    player.vm.increaseScore();
    player.vm.reset();
    it('should have 0 attempts', () => {
        expect(player.vm.attempts).toBe(0);
    });
    it('should have 0 score', () => {
        expect(player.vm.score).toBe(0);
    });
});