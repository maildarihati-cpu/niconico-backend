"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroSetting = exports.Hero = void 0;
const utils_1 = require("@medusajs/framework/utils");
const Hero = utils_1.model.define("hero", {
    id: utils_1.model.id({ prefix: "hero" }).primaryKey(),
    image_url: utils_1.model.text(),
    position: utils_1.model.number().default(0),
    category: utils_1.model.text().default("hero-banner"),
});
exports.Hero = Hero;
const HeroSetting = utils_1.model.define("hero_setting", {
    id: utils_1.model.id({ prefix: "hset" }).primaryKey(),
    global_title: utils_1.model.text().default("SIMPLY BE YOUR OWN"),
});
exports.HeroSetting = HeroSetting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVyby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2hlcm8vbW9kZWxzL2hlcm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWlEO0FBRWpELE1BQU0sSUFBSSxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO0lBQ2hDLEVBQUUsRUFBRSxhQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFO0lBQzdDLFNBQVMsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ3ZCLFFBQVEsRUFBRSxhQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNuQyxRQUFRLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7Q0FDOUMsQ0FBQyxDQUFBO0FBUU8sb0JBQUk7QUFOYixNQUFNLFdBQVcsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtJQUMvQyxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRTtJQUM3QyxZQUFZLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztDQUN6RCxDQUFDLENBQUE7QUFHYSxrQ0FBVyJ9