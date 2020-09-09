export default class SwaggerService {
  _apiKey = '8xZBYLh04KItILB5uYVO';

  _apiBase = `https://rs-react-schedule.firebaseapp.com/api/team/${this._apiKey}/`;

  async getResource(urlParameter, requestMethod, data) {
    const url = `${this._apiBase}${urlParameter}`;
    const response = await fetch(url, this.getBodyRequest(requestMethod, data));

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    const content = await response.json();
    return content;
  }

  getBodyRequest = (requestMethod, settings) => {
    let bodyRequest = {
      method: requestMethod,
    };

    if (settings) {
      bodyRequest = {
        ...bodyRequest,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      };
    }
    return bodyRequest;
  };

  async getAllEvents() {
    const response = await this.getResource('events', 'GET');

    return response.data;
  }

  async getAllOrganizers() {
    const response = await this.getResource('organizers', 'GET');

    return response.data;
  }

  async addEvent(event) {
    console.log('addEvent', event);
    await this.getResource('event', 'POST', event);
  }

  async addOrganizer(organizer) {
    await this.getResource('organizer', 'POST', organizer);
  }

  async getEventById(eventId) {
    const response = await this.getResource(`event/${eventId}`, 'GET');
    return response;
  }

  async getOrganizerById(organizerId) {
    const response = await this.getResource(`organizer/${organizerId}`, 'GET');
    return response;
  }

  async updateEventById(eventId, event) {
    await this.getResource(`event/${eventId}`, 'PUT', { ...event, id: eventId });
  }

  async updateOrganizerById(organizerId, organizer) {
    await this.getResource(`organizer/${organizerId}`, 'PUT', { ...organizer, id: organizerId });
  }

  async deleteEventById(eventId) {
    this.getResource(`event/${eventId}`, 'DELETE');
  }

  async deleteOrganizerById(organizerId) {
    this.getResource(`organizer/${organizerId}`, 'DELETE');
  }
}
