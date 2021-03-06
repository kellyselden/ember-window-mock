import parseUri from './parse-uri';

/**
 * mock implementation of window.mock
 *
 * based on https://github.com/RyanV/jasmine-fake-window/blob/master/src/jasmine_fake_window.js
 *
 * @type {Object}
 * @public
 */


export default function locationFactory() {
  const location = {};

  Object.defineProperty(location, 'href', {
    value: '',
    enumerable: true,
    writable: true
  });

  /**
   * location.port
   */
  Object.defineProperty(location, 'port', {
    get() {
      return parseUri(this.href).port;
    },
    set(port) {
      let old = this.port;
      this.href = this.href.replace(old, port);
    },
    enumerable: true
  });

  /**
   * location.host
   */
  Object.defineProperty(location, 'host', {
    get() {
      return this.port ? `${this.hostname}:${this.port}` : this.hostname;
    },
    set(host) {
      let old = this.host;
      this.href = this.href.replace(old, host);
    },
    enumerable: true
  });

  /**
   * location.hostname
   * @returns {String} host + port
   */
  Object.defineProperty(location, 'hostname', {
    get() {
      return parseUri(this.href).host;
    },
    set(hostname) {
      let old = this.hostname;
      this.href = this.href.replace(old, hostname);
    }
  });

  /**
   * location.hash
   */
  Object.defineProperty(location, 'hash', {
    get() {
      let hash = parseUri(this.href).anchor;
      return hash ? `#${hash}` : '';
    },
    set(hash) {
      let old = this.hash;
      this.href = this.href.replace(old, hash);
    }
  });

  /**
   * location.origin
   */
  Object.defineProperty(location, 'origin', {
    get() {
      return `${this.protocol}//${this.host}`;
    },
    set(origin) {
      let old = this.origin;
      this.href = this.href.replace(old, origin);
    }
  });

  /**
   * location.search
   */
  Object.defineProperty(location, 'search', {
    get() {
      let q = parseUri(this.href).query;
      return q ? `?${q}` : '';
    },
    set(search) {
      let old = this.search;
      this.href = this.href.replace(old, search);
    }
  });

  /**
   * location.pathname
   */
  Object.defineProperty(location, 'pathname', {
    get() {
      return parseUri(this.href).path;
    },
    set(path) {
      let old = this.pathname;
      this.href = this.href.replace(old, path);
    }
  });

  /**
   * location.protocol
   */
  Object.defineProperty(location, 'protocol', {
    get() {
      return `${parseUri(this.href).protocol}:`;
    },
    set(protocol) {
      let old = this.protocol;
      this.href = this.href.replace(old, protocol);
    }
  });
  location.reload = function() {};
  location.assign = function(url) {
    this.href = url;
  };
  location.replace = location.assign;
  location.toString = function() {
    return this.href;
  };

  return location;
}
