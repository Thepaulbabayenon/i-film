"use strict";
// src/seed.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var neon_http_1 = require("drizzle-orm/neon-http");
var serverless_1 = require("@neondatabase/serverless");
var dotenv_1 = require("dotenv");
var schema_1 = require("../db/schema");
(0, dotenv_1.config)({ path: '.env' });
var sql = (0, serverless_1.neon)(process.env.DATABASE_URL);
var db = (0, neon_http_1.drizzle)(sql);
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.insert(schema_1.movie).values([
                        {
                            id: 0,
                            title: "Gran Turismo",
                            age: 12,
                            duration: 2.15,
                            overview: "The ultimate wish-fulfillment tale of a teenage Gran Turismo player whose gaming skills won him a series of Nissan competitions to become an actual professional racecar driver.",
                            videoSource: "https://utfs.io/f/916e1354-a1b6-4832-97ab-9fa95876b91a-bnyedt.mp4",
                            imageString: "https://image.tmdb.org/t/p/original/r7DuyYJ0N3cD8bRKsR5Ygq2P7oa.jpg",
                            release: 2023,
                            category: "recent",
                            youtubeString: "https://www.youtube.com/embed/GVPzGBvPrzw",
                        },
                        {
                            imageString: "https://image.tmdb.org/t/p/original/kHlX3oqdD4VGaLpB8O78M25KfdS.jpg",
                            title: "A Haunting in Venice",
                            age: 12,
                            duration: 1.44,
                            id: 1,
                            overview: "Celebrated sleuth Hercule Poirot, now retired and living in self-imposed exile in Venice, reluctantly attends a Halloween séance at a decaying, haunted palazzo. When one of the guests is murdered, the detective is thrust into a sinister world of shadows and secrets.",
                            release: 2023,
                            videoSource: "",
                            category: "recent",
                            youtubeString: "https://www.youtube.com/embed/yEddsSwweyE",
                        },
                        {
                            id: 2,
                            title: "Five Nights at Freddy's",
                            age: 16,
                            duration: 1.5,
                            overview: "Recently fired and desperate for work, a troubled young man named Mike agrees to take a position as a night security guard at an abandoned theme restaurant: Freddy Fazbear's Pizzeria. But he soon discovers that nothing at Freddy's is what it seems.",
                            release: 2023,
                            videoSource: "",
                            imageString: "https://image.tmdb.org/t/p/original/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
                            category: "recent",
                            youtubeString: "https://www.youtube.com/embed/0VH9WCFV6XQ",
                        },
                        {
                            id: 3,
                            title: "The Blacklist",
                            age: 16,
                            duration: 0,
                            imageString: "https://image.tmdb.org/t/p/original/dDPwCyZG8arYwMDoQl0sm4xccCE.jpg",
                            overview: "Raymond \"Red\" Reddington, one of the FBI's most wanted fugitives, surrenders in person at FBI Headquarters in Washington, D.C. He claims that he and the FBI have the same interests: bringing down dangerous criminals and terrorists. In the last two decades, he's made a list of criminals and terrorists that matter the most but the FBI cannot find because it does not know they exist. Reddington calls this \"The Blacklist\". Reddington will co-operate, but insists that he will speak only to Elizabeth Keen, a rookie FBI profiler",
                            release: 2013,
                            videoSource: "",
                            category: "show",
                            youtubeString: "https://www.youtube.com/embed/-WYdUaK54fU",
                        },
                        {
                            id: 4,
                            title: "Suits",
                            age: 12,
                            duration: 0,
                            imageString: "https://image.tmdb.org/t/p/original/or0E36KfzJYZwqXeiCfm1JgepKF.jpg",
                            overview: "While running from a drug deal gone bad, Mike Ross, a brilliant young college-dropout, slips into a job interview with one of New York City's best legal closers, Harvey Specter. Tired of cookie-cutter law school grads, Harvey takes a gamble by hiring Mike on the spot after he recognizes his raw talent and photographic memory.",
                            release: 2011,
                            videoSource: "",
                            category: "show",
                            youtubeString: "https://www.youtube.com/embed/85z53bAebsI",
                        },
                        {
                            id: 5,
                            title: "Chernobyl",
                            age: 16,
                            duration: 0,
                            imageString: "https://image.tmdb.org/t/p/original/900tHlUYUkp7Ol04XFSoAaEIXcT.jpg",
                            overview: "The true story of one of the worst man-made catastrophes in history: the catastrophic nuclear accident at Chernobyl. A tale of the brave men and women who sacrificed to save Europe from unimaginable disaster.",
                            release: 2019,
                            videoSource: "",
                            category: "show",
                            youtubeString: "https://www.youtube.com/embed/s9APLXM9Ei8",
                        },
                        {
                            id: 6,
                            title: "Retribution",
                            age: 12,
                            duration: 1.31,
                            imageString: "https://image.tmdb.org/t/p/original/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg",
                            overview: "When a mysterious caller puts a bomb under his car seat, Matt Turner begins a high-speed chase across the city to complete a specific series of tasks- all with his kids trapped in the back seat.",
                            release: 2023,
                            videoSource: "",
                            category: "recent",
                            youtubeString: "https://www.youtube.com/embed/jzQn0-WH4WM",
                        },
                        {
                            id: 7,
                            title: "Spider-Man: Across the Spider-Verse",
                            age: 12,
                            duration: 2.2,
                            imageString: "https://image.tmdb.org/t/p/original/nGxUxi3PfXDRm7Vg95VBNgNM8yc.jpg",
                            overview: "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
                            release: 2023,
                            videoSource: "",
                            category: "movie",
                            youtubeString: "https://www.youtube.com/embed/shW9i6k8cB0",
                        },
                        {
                            id: 8,
                            title: "Coco",
                            release: 2017,
                            age: 0,
                            duration: 1.45,
                            imageString: "https://image.tmdb.org/t/p/original/askg3SMvhqEl4OL52YuvdtY40Yb.jpg",
                            overview: "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
                            videoSource: "",
                            category: "movie",
                            youtubeString: "https://www.youtube.com/embed/xlnPHQ3TLX8",
                        },
                        {
                            id: 9,
                            title: "Monk",
                            release: 2002,
                            age: 12,
                            duration: 0,
                            imageString: "https://image.tmdb.org/t/p/original/cTQYB39EwM01fl9b9KpNUgZfOsT.jpg",
                            overview: "Adrian Monk was once a rising star with the San Francisco Police Department, legendary for using unconventional means to solve the department's most baffling cases. But after the tragic (and still unsolved) murder of his wife Trudy, he developed an extreme case of obsessive-compulsive disorder. Now working as a private consultant, Monk continues to investigate cases in the most unconventional ways.",
                            videoSource: "",
                            category: "show",
                            youtubeString: "https://www.youtube.com/embed/mftbaaU82Uc",
                        },
                        {
                            id: 10,
                            title: "Family Guy",
                            age: 16,
                            duration: 0,
                            imageString: "https://image.tmdb.org/t/p/original/y4PDksvxM05sNxacoU8xIYITCDA.jpg",
                            overview: "Sick, twisted, politically incorrect and Freakin' Sweet animated series featuring the adventures of the dysfunctional Griffin family. Bumbling Peter and long-suffering Lois have three kids. Stewie (a brilliant but sadistic baby bent on killing his mother and taking over the world), Meg (the oldest, and is the most unpopular girl in town) and Chris (the middle kid, he's not very bright but has a passion for movies). The final member of the family is Brian - a talking dog and much more than a pet, he keeps Stewie in check whilst sipping Martinis and sorting through his own life issues.",
                            release: 1999,
                            videoSource: "",
                            category: "show",
                            youtubeString: "https://www.youtube.com/embed/7hRxWGo49oc",
                        },
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, seed()];
                case 1:
                    _a.sent();
                    console.log('Seeding completed');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error during seeding:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
main();
