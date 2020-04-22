import { requestEvents } from "./components/services";

test('fetch events', () => {
    return requestEvents()
        .then(data => {
            const event = data[0];
            expect(event).toMatchObject(
                {
                    eventId: expect.any(String),
                    eventStatus: expect.any(Number),
                    eventName: expect.any(String),
                    artist: expect.any(String),
                    eventStart: expect.any(Number),
                    eventDurationHours: expect.any(Number),
                    hall: expect.any(Number),
                    eventType: expect.any(Number),
                    description: expect.any(String),
                    images: expect.any(Array),
                    priceRanges: expect.any(Array),
                    managers: expect.any(Array)
                });
        });
});