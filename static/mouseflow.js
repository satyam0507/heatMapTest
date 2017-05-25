if (typeof mouseflow == "undefined" && typeof mouseflowPlayback == "undefined") {
    window.mouseflow = (function(_1, _47) {
        var _77 = "https://o2.mouseflow.com/";
        var _45 = "1b0c56f6-3a77-4ce7-ad15-1f74368ca6b4";
        var _185 = 1;
        var _88 = ["invitereferrals.com"];
        var _169 = "13.28";
        var _144 = false;
        var _82 = false;
        var _121 = false;
        var _257 = /\[(\d+)\]_mf$/;
        var _7 = _1.document;
        var _36 = _1.location;
        var _13 = _314();
        _405();
        var _19;
        var _4 = _323();
        var _0 = _213();
        var _41 = {
            _125: 100,
            _375: 10000,
            _356: 1336,
            _159: 3600000,
            _339: 3600000,
            _380: 7776000000,
            _337: 100,
            _404: 2000
        };
        var _166 = 0;
        var _151 = 0;
        var _90 = 0;
        var _216 = 0;
        var _96 = 0;
        var _143 = 0;
        var _112 = null;
        var _217;

        function _405() {
            if (!_1._mfq) _1._mfq = [];
            if (_mfq.length) {
                for (var _54 = 0; _54 < _mfq.length; _54++) {
                    var _39 = _mfq[_54];
                    if (_39 && typeof _39 === 'object' && _39.length && _39[0] === 'config') {
                        _215.apply(this, _39.slice(1))
                    }
                }
            }
        }

        function _218(_113) {
            if (_113 && _113.length) {
                for (var _54 = 0; _54 < _113.length; _54++) {
                    this.push(_113[_54])
                }
            }
        };
        _218.prototype.push = function(_39) {
            if (_39) {
                if (typeof _39 === 'object' && _39.length) {
                    var _226 = _39.splice(0, 1);
                    if (mouseflow[_226]) mouseflow[_226].apply(mouseflow, _39)
                } else if (typeof _39 === 'function') _39(mouseflow)
            }
        };
        var _85 = (typeof _85 === 'function') ? new _85(_1, _47, _4, _0, _148, _117, _223, _183, _6, _64) : {
            _78: function() {},
            _58: function() {},
            _305: function() {}
        };
        var __extends = this.__extends || function(d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d
            }
            __.prototype = b.prototype;
            d.prototype = new __()
        };
        var MutationObserverCtor;
        if (typeof WebKitMutationObserver !== 'undefined') MutationObserverCtor = WebKitMutationObserver;
        else if (typeof MutationObserver !== 'undefined') MutationObserverCtor = MutationObserver;
        if (MutationObserverCtor === undefined) {
            _6('DOM Mutation Observers not supported.')
        }
        var NodeMap = (function() {
            function NodeMap() {
                this.nodes = [];
                this.values = []
            }
            NodeMap.prototype.isIndex = function(s) {
                return +s === s >>> 0
            };
            NodeMap.prototype.nodeId = function(node) {
                var id = node[NodeMap.ID_PROP];
                if (!id) id = node[NodeMap.ID_PROP] = NodeMap.nextId_++;
                return id
            };
            NodeMap.prototype.set = function(node, value) {
                var id = this.nodeId(node);
                this.nodes[id] = node;
                this.values[id] = value
            };
            NodeMap.prototype.get = function(node) {
                var id = this.nodeId(node);
                return this.values[id]
            };
            NodeMap.prototype.has = function(node) {
                return this.nodeId(node) in this.nodes
            };
            NodeMap.prototype.deleteNode = function(node) {
                var id = this.nodeId(node);
                delete this.nodes[id];
                this.values[id] = undefined
            };
            NodeMap.prototype.keys = function() {
                var nodes = [];
                for (var id in this.nodes) {
                    if (!this.isIndex(id)) continue;
                    nodes.push(this.nodes[id])
                }
                return nodes
            };
            NodeMap.ID_PROP = '__mouseflow_node_map_id__';
            NodeMap.nextId_ = 1;
            return NodeMap
        })();
        var Movement;
        (function(Movement) {
            Movement[Movement["STAYED_OUT"] = 0] = "STAYED_OUT";
            Movement[Movement["ENTERED"] = 1] = "ENTERED";
            Movement[Movement["STAYED_IN"] = 2] = "STAYED_IN";
            Movement[Movement["REPARENTED"] = 3] = "REPARENTED";
            Movement[Movement["REORDERED"] = 4] = "REORDERED";
            Movement[Movement["EXITED"] = 5] = "EXITED"
        })(Movement || (Movement = {}));

        function enteredOrExited(changeType) {
            return changeType === Movement.ENTERED || changeType === Movement.EXITED
        }
        var NodeChange = (function() {
            function NodeChange(node, childList, attributes, characterData, oldParentNode, added, attributeOldValues, characterDataOldValue) {
                if (childList === void 0) {
                    childList = false
                }
                if (attributes === void 0) {
                    attributes = false
                }
                if (characterData === void 0) {
                    characterData = false
                }
                if (oldParentNode === void 0) {
                    oldParentNode = null
                }
                if (added === void 0) {
                    added = false
                }
                if (attributeOldValues === void 0) {
                    attributeOldValues = null
                }
                if (characterDataOldValue === void 0) {
                    characterDataOldValue = null
                }
                this.node = node;
                this.childList = childList;
                this.attributes = attributes;
                this.characterData = characterData;
                this.oldParentNode = oldParentNode;
                this.added = added;
                this.attributeOldValues = attributeOldValues;
                this.characterDataOldValue = characterDataOldValue;
                this.isCaseInsensitive = this.node.nodeType === 1 && this.node instanceof HTMLElement && this.node.ownerDocument instanceof HTMLDocument
            }
            NodeChange.prototype.getAttributeOldValue = function(name) {
                if (!this.attributeOldValues) return undefined;
                if (this.isCaseInsensitive) name = name.toLowerCase();
                return this.attributeOldValues[name]
            };
            NodeChange.prototype.getAttributeNamesMutated = function() {
                var names = [];
                if (!this.attributeOldValues) return names;
                for (var name in this.attributeOldValues) {
                    names.push(name)
                }
                return names
            };
            NodeChange.prototype.attributeMutated = function(name, oldValue) {
                this.attributes = true;
                this.attributeOldValues = this.attributeOldValues || {};
                if (name in this.attributeOldValues) return;
                this.attributeOldValues[name] = oldValue
            };
            NodeChange.prototype.characterDataMutated = function(oldValue) {
                if (this.characterData) return;
                this.characterData = true;
                this.characterDataOldValue = oldValue
            };
            NodeChange.prototype.removedFromParent = function(parent) {
                this.childList = true;
                if (this.added || this.oldParentNode) this.added = false;
                else this.oldParentNode = parent
            };
            NodeChange.prototype.insertedIntoParent = function() {
                this.childList = true;
                this.added = true
            };
            NodeChange.prototype.getOldParent = function() {
                if (this.childList) {
                    if (this.oldParentNode) return this.oldParentNode;
                    if (this.added) return null
                }
                return this.node.parentNode
            };
            return NodeChange
        })();
        var ChildListChange = (function() {
            function ChildListChange() {
                this.added = new NodeMap();
                this.removed = new NodeMap();
                this.maybeMoved = new NodeMap();
                this.oldPrevious = new NodeMap();
                this.moved = undefined
            }
            return ChildListChange
        })();
        var TreeChanges = (function(_225) {
            __extends(TreeChanges, _225);

            function TreeChanges(rootNode, mutations) {
                _225.call(this);
                this.rootNode = rootNode;
                this.reachableCache = undefined;
                this.wasReachableCache = undefined;
                this.anyParentsChanged = false;
                this.anyAttributesChanged = false;
                this.anyCharacterDataChanged = false;
                for (var m = 0; m < mutations.length; m++) {
                    var mutation = mutations[m];
                    switch (mutation.type) {
                        case 'childList':
                            this.anyParentsChanged = true;
                            for (var i = 0; i < mutation.removedNodes.length; i++) {
                                var node = mutation.removedNodes[i];
                                this.getChange(node).removedFromParent(mutation.target)
                            }
                            for (var i = 0; i < mutation.addedNodes.length; i++) {
                                var node = mutation.addedNodes[i];
                                this.getChange(node).insertedIntoParent()
                            }
                            break;
                        case 'attributes':
                            this.anyAttributesChanged = true;
                            var change = this.getChange(mutation.target);
                            change.attributeMutated(mutation.attributeName, mutation.oldValue);
                            break;
                        case 'characterData':
                            this.anyCharacterDataChanged = true;
                            var change = this.getChange(mutation.target);
                            change.characterDataMutated(mutation.oldValue);
                            break
                    }
                }
            }
            TreeChanges.prototype.getChange = function(node) {
                var change = this.get(node);
                if (!change) {
                    change = new NodeChange(node);
                    this.set(node, change)
                }
                return change
            };
            TreeChanges.prototype.getOldParent = function(node) {
                var change = this.get(node);
                return change ? change.getOldParent() : node.parentNode
            };
            TreeChanges.prototype.getIsReachable = function(node) {
                if (node === this.rootNode) return true;
                if (!node) return false;
                this.reachableCache = this.reachableCache || new NodeMap();
                var isReachable = this.reachableCache.get(node);
                if (isReachable === undefined) {
                    isReachable = this.getIsReachable(node.parentNode);
                    this.reachableCache.set(node, isReachable)
                }
                return isReachable
            };
            TreeChanges.prototype.getWasReachable = function(node) {
                if (node === this.rootNode) return true;
                if (!node) return false;
                this.wasReachableCache = this.wasReachableCache || new NodeMap();
                var wasReachable = this.wasReachableCache.get(node);
                if (wasReachable === undefined) {
                    wasReachable = this.getWasReachable(this.getOldParent(node));
                    this.wasReachableCache.set(node, wasReachable)
                }
                return wasReachable
            };
            TreeChanges.prototype.reachabilityChange = function(node) {
                if (this.getIsReachable(node)) {
                    return this.getWasReachable(node) ? Movement.STAYED_IN : Movement.ENTERED
                }
                return this.getWasReachable(node) ? Movement.EXITED : Movement.STAYED_OUT
            };
            return TreeChanges
        })(NodeMap);
        var MutationProjection = (function() {
            function MutationProjection(rootNode, mutations, selectors, calcReordered, calcOldPreviousSibling) {
                this.rootNode = rootNode;
                this.mutations = mutations;
                this.selectors = selectors;
                this.calcReordered = calcReordered;
                this.calcOldPreviousSibling = calcOldPreviousSibling;
                this.treeChanges = new TreeChanges(rootNode, mutations);
                this.entered = [];
                this.exited = [];
                this.stayedIn = new NodeMap();
                this.visited = new NodeMap();
                this.childListChangeMap = undefined;
                this.characterDataOnly = undefined;
                this.matchCache = undefined;
                this.processMutations()
            }
            MutationProjection.prototype.processMutations = function() {
                if (!this.treeChanges.anyParentsChanged && !this.treeChanges.anyAttributesChanged) return;
                var changedNodes = this.treeChanges.keys();
                for (var i = 0; i < changedNodes.length; i++) {
                    this.visitNode(changedNodes[i], undefined)
                }
            };
            MutationProjection.prototype.visitNode = function(node, parentReachable) {
                if (this.visited.has(node)) return;
                this.visited.set(node, true);
                var change = this.treeChanges.get(node);
                var reachable = parentReachable;
                if ((change && change.childList) || reachable == undefined) reachable = this.treeChanges.reachabilityChange(node);
                if (reachable === Movement.STAYED_OUT) return;
                this.matchabilityChange(node);
                if (reachable === Movement.ENTERED) {
                    this.entered.push(node)
                } else if (reachable === Movement.EXITED) {
                    this.exited.push(node);
                    this.ensureHasOldPreviousSiblingIfNeeded(node)
                } else if (reachable === Movement.STAYED_IN) {
                    var movement = Movement.STAYED_IN;
                    if (change && change.childList) {
                        if (change.oldParentNode !== node.parentNode) {
                            movement = Movement.REPARENTED;
                            this.ensureHasOldPreviousSiblingIfNeeded(node)
                        } else if (this.calcReordered && this.wasReordered(node)) {
                            movement = Movement.REORDERED
                        }
                    }
                    this.stayedIn.set(node, movement)
                }
                if (reachable === Movement.STAYED_IN) return;
                for (var child = node.firstChild; child; child = child.nextSibling) {
                    this.visitNode(child, reachable)
                }
            };
            MutationProjection.prototype.ensureHasOldPreviousSiblingIfNeeded = function(node) {
                if (!this.calcOldPreviousSibling) return;
                this.processChildlistChanges();
                var parentNode = node.parentNode;
                var nodeChange = this.treeChanges.get(node);
                if (nodeChange && nodeChange.oldParentNode) parentNode = nodeChange.oldParentNode;
                var change = this.childListChangeMap.get(parentNode);
                if (!change) {
                    change = new ChildListChange();
                    this.childListChangeMap.set(parentNode, change)
                }
                if (!change.oldPrevious.has(node)) {
                    change.oldPrevious.set(node, node.previousSibling)
                }
            };
            MutationProjection.prototype.getChanged = function(summary, selectors, characterDataOnly) {
                this.selectors = selectors;
                this.characterDataOnly = characterDataOnly;
                for (var i = 0; i < this.entered.length; i++) {
                    var node = this.entered[i];
                    var matchable = this.matchabilityChange(node);
                    if (matchable === Movement.ENTERED || matchable === Movement.STAYED_IN) summary.added.push(node)
                }
                var stayedInNodes = this.stayedIn.keys();
                for (var i = 0; i < stayedInNodes.length; i++) {
                    var node = stayedInNodes[i];
                    var matchable = this.matchabilityChange(node);
                    if (matchable === Movement.ENTERED) {
                        summary.added.push(node)
                    } else if (matchable === Movement.EXITED) {
                        summary.removed.push(node)
                    } else if (matchable === Movement.STAYED_IN && (summary.reparented || summary.reordered)) {
                        var movement = this.stayedIn.get(node);
                        if (summary.reparented && movement === Movement.REPARENTED) summary.reparented.push(node);
                        else if (summary.reordered && movement === Movement.REORDERED) summary.reordered.push(node)
                    }
                }
                for (var i = 0; i < this.exited.length; i++) {
                    var node = this.exited[i];
                    var matchable = this.matchabilityChange(node);
                    if (matchable === Movement.EXITED || matchable === Movement.STAYED_IN) summary.removed.push(node)
                }
            };
            MutationProjection.prototype.getOldParentNode = function(node) {
                var change = this.treeChanges.get(node);
                if (change && change.childList) return change.oldParentNode ? change.oldParentNode : null;
                var reachabilityChange = this.treeChanges.reachabilityChange(node);
                if (reachabilityChange === Movement.STAYED_OUT || reachabilityChange === Movement.ENTERED) throw Error('getOldParentNode requested on invalid node.');
                return node.parentNode
            };
            MutationProjection.prototype.getOldPreviousSibling = function(node) {
                var parentNode = node.parentNode;
                var nodeChange = this.treeChanges.get(node);
                if (nodeChange && nodeChange.oldParentNode) parentNode = nodeChange.oldParentNode;
                var change = this.childListChangeMap.get(parentNode);
                if (!change) throw Error('getOldPreviousSibling requested on invalid node.');
                return change.oldPrevious.get(node)
            };
            MutationProjection.prototype.getOldAttribute = function(element, attrName) {
                var change = this.treeChanges.get(element);
                if (!change || !change.attributes) throw Error('getOldAttribute requested on invalid node.');
                var value = change.getAttributeOldValue(attrName);
                if (value === undefined) throw Error('getOldAttribute requested for unchanged attribute name.');
                return value
            };
            MutationProjection.prototype.attributeChangedNodes = function(includeAttributes) {
                if (!this.treeChanges.anyAttributesChanged) return {};
                var attributeFilter;
                var caseInsensitiveFilter;
                if (includeAttributes) {
                    attributeFilter = {};
                    caseInsensitiveFilter = {};
                    for (var i = 0; i < includeAttributes.length; i++) {
                        var attrName = includeAttributes[i];
                        attributeFilter[attrName] = true;
                        caseInsensitiveFilter[attrName.toLowerCase()] = attrName
                    }
                }
                var result = {};
                var nodes = this.treeChanges.keys();
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    var change = this.treeChanges.get(node);
                    if (!change.attributes) continue;
                    if (Movement.STAYED_IN !== this.treeChanges.reachabilityChange(node) || Movement.STAYED_IN !== this.matchabilityChange(node)) {
                        continue
                    }
                    var element = node;
                    var changedAttrNames = change.getAttributeNamesMutated();
                    for (var j = 0; j < changedAttrNames.length; j++) {
                        var attrName = changedAttrNames[j];
                        if (attributeFilter && !attributeFilter[attrName] && !(change.isCaseInsensitive && caseInsensitiveFilter[attrName])) {
                            continue
                        }
                        var oldValue = change.getAttributeOldValue(attrName);
                        if (oldValue === element.getAttribute(attrName)) continue;
                        if (caseInsensitiveFilter && change.isCaseInsensitive) attrName = caseInsensitiveFilter[attrName];
                        result[attrName] = result[attrName] || [];
                        result[attrName].push(element)
                    }
                }
                return result
            };
            MutationProjection.prototype.getOldCharacterData = function(node) {
                var change = this.treeChanges.get(node);
                if (!change || !change.characterData) throw Error('getOldCharacterData requested on invalid node.');
                return change.characterDataOldValue
            };
            MutationProjection.prototype.getCharacterDataChanged = function() {
                if (!this.treeChanges.anyCharacterDataChanged) return [];
                var nodes = this.treeChanges.keys();
                var result = [];
                for (var i = 0; i < nodes.length; i++) {
                    var target = nodes[i];
                    if (Movement.STAYED_IN !== this.treeChanges.reachabilityChange(target)) continue;
                    var change = this.treeChanges.get(target);
                    if (!change.characterData || target.textContent == change.characterDataOldValue) continue;
                    result.push(target)
                }
                return result
            };
            MutationProjection.prototype.computeMatchabilityChange = function(selector, el) {
                if (!this.matchCache) this.matchCache = [];
                if (!this.matchCache[selector.uid]) this.matchCache[selector.uid] = new NodeMap();
                var cache = this.matchCache[selector.uid];
                var result = cache.get(el);
                if (result === undefined) {
                    result = selector.matchabilityChange(el, this.treeChanges.get(el));
                    cache.set(el, result)
                }
                return result
            };
            MutationProjection.prototype.matchabilityChange = function(node) {
                var _27 = this;
                if (this.characterDataOnly) {
                    switch (node.nodeType) {
                        case 8:
                        case 3:
                            return Movement.STAYED_IN;
                        default:
                            return Movement.STAYED_OUT
                    }
                }
                if (!this.selectors) return Movement.STAYED_IN;
                if (node.nodeType !== 1) return Movement.STAYED_OUT;
                var el = node;
                var matchChanges = this.selectors.map(function(selector) {
                    return _27.computeMatchabilityChange(selector, el)
                });
                var accum = Movement.STAYED_OUT;
                var i = 0;
                while (accum !== Movement.STAYED_IN && i < matchChanges.length) {
                    switch (matchChanges[i]) {
                        case Movement.STAYED_IN:
                            accum = Movement.STAYED_IN;
                            break;
                        case Movement.ENTERED:
                            if (accum === Movement.EXITED) accum = Movement.STAYED_IN;
                            else accum = Movement.ENTERED;
                            break;
                        case Movement.EXITED:
                            if (accum === Movement.ENTERED) accum = Movement.STAYED_IN;
                            else accum = Movement.EXITED;
                            break
                    }
                    i++
                }
                return accum
            };
            MutationProjection.prototype.getChildlistChange = function(el) {
                var change = this.childListChangeMap.get(el);
                if (!change) {
                    change = new ChildListChange();
                    this.childListChangeMap.set(el, change)
                }
                return change
            };
            MutationProjection.prototype.processChildlistChanges = function() {
                if (this.childListChangeMap) return;
                this.childListChangeMap = new NodeMap();
                for (var i = 0; i < this.mutations.length; i++) {
                    var mutation = this.mutations[i];
                    if (mutation.type != 'childList') continue;
                    if (this.treeChanges.reachabilityChange(mutation.target) !== Movement.STAYED_IN && !this.calcOldPreviousSibling) continue;
                    var change = this.getChildlistChange(mutation.target);
                    var oldPrevious = mutation.previousSibling;

                    function recordOldPrevious(node, previous) {
                        if (!node || change.oldPrevious.has(node) || change.added.has(node) || change.maybeMoved.has(node)) return;
                        if (previous && (change.added.has(previous) || change.maybeMoved.has(previous))) return;
                        change.oldPrevious.set(node, previous)
                    }
                    for (var j = 0; j < mutation.removedNodes.length; j++) {
                        var node = mutation.removedNodes[j];
                        recordOldPrevious(node, oldPrevious);
                        if (change.added.has(node)) {
                            change.added.deleteNode(node)
                        } else {
                            change.removed.set(node, true);
                            change.maybeMoved.deleteNode(node)
                        }
                        oldPrevious = node
                    }
                    recordOldPrevious(mutation.nextSibling, oldPrevious);
                    for (var j = 0; j < mutation.addedNodes.length; j++) {
                        var node = mutation.addedNodes[j];
                        if (change.removed.has(node)) {
                            change.removed.deleteNode(node);
                            change.maybeMoved.set(node, true)
                        } else {
                            change.added.set(node, true)
                        }
                    }
                }
            };
            MutationProjection.prototype.wasReordered = function(node) {
                if (!this.treeChanges.anyParentsChanged) return false;
                this.processChildlistChanges();
                var parentNode = node.parentNode;
                var nodeChange = this.treeChanges.get(node);
                if (nodeChange && nodeChange.oldParentNode) parentNode = nodeChange.oldParentNode;
                var change = this.childListChangeMap.get(parentNode);
                if (!change) return false;
                if (change.moved) return change.moved.get(node);
                change.moved = new NodeMap();
                var pendingMoveDecision = new NodeMap();

                function isMoved(node) {
                    if (!node) return false;
                    if (!change.maybeMoved.has(node)) return false;
                    var didMove = change.moved.get(node);
                    if (didMove !== undefined) return didMove;
                    if (pendingMoveDecision.has(node)) {
                        didMove = true
                    } else {
                        pendingMoveDecision.set(node, true);
                        didMove = getPrevious(node) !== getOldPrevious(node)
                    }
                    if (pendingMoveDecision.has(node)) {
                        pendingMoveDecision.deleteNode(node);
                        change.moved.set(node, didMove)
                    } else {
                        didMove = change.moved.get(node)
                    }
                    return didMove
                }
                var oldPreviousCache = new NodeMap();

                function getOldPrevious(node) {
                    var oldPrevious = oldPreviousCache.get(node);
                    if (oldPrevious !== undefined) return oldPrevious;
                    oldPrevious = change.oldPrevious.get(node);
                    while (oldPrevious && (change.removed.has(oldPrevious) || isMoved(oldPrevious))) {
                        oldPrevious = getOldPrevious(oldPrevious)
                    }
                    if (oldPrevious === undefined) oldPrevious = node.previousSibling;
                    oldPreviousCache.set(node, oldPrevious);
                    return oldPrevious
                }
                var previousCache = new NodeMap();

                function getPrevious(node) {
                    if (previousCache.has(node)) return previousCache.get(node);
                    var previous = node.previousSibling;
                    while (previous && (change.added.has(previous) || isMoved(previous))) previous = previous.previousSibling;
                    previousCache.set(node, previous);
                    return previous
                }
                change.maybeMoved.keys().forEach(isMoved);
                return change.moved.get(node)
            };
            return MutationProjection
        })();
        var Summary = (function() {
            function Summary(projection, query) {
                var _27 = this;
                this.projection = projection;
                this.added = [];
                this.removed = [];
                this.reparented = query.all || query.element || query.characterData ? [] : undefined;
                this.reordered = query.all ? [] : undefined;
                projection.getChanged(this, query.elementFilter, query.characterData);
                if (query.all || query.attribute || query.attributeList) {
                    var filter = query.attribute ? [query.attribute] : query.attributeList;
                    var attributeChanged = projection.attributeChangedNodes(filter);
                    if (query.attribute) {
                        this.valueChanged = attributeChanged[query.attribute] || []
                    } else {
                        this.attributeChanged = attributeChanged;
                        if (query.attributeList) {
                            query.attributeList.forEach(function(attrName) {
                                if (!_27.attributeChanged.hasOwnProperty(attrName)) _27.attributeChanged[attrName] = []
                            })
                        }
                    }
                }
                if (query.all || query.characterData) {
                    var characterDataChanged = projection.getCharacterDataChanged();
                    if (query.characterData) this.valueChanged = characterDataChanged;
                    else this.characterDataChanged = characterDataChanged
                }
                if (this.reordered) this.getOldPreviousSibling = projection.getOldPreviousSibling.bind(projection)
            }
            Summary.prototype.getOldParentNode = function(node) {
                return this.projection.getOldParentNode(node)
            };
            Summary.prototype.getOldAttribute = function(node, name) {
                return this.projection.getOldAttribute(node, name)
            };
            Summary.prototype.getOldCharacterData = function(node) {
                return this.projection.getOldCharacterData(node)
            };
            Summary.prototype.getOldPreviousSibling = function(node) {
                return this.projection.getOldPreviousSibling(node)
            };
            return Summary
        })();
        var validNameInitialChar = /[a-zA-Z_]+/;
        var validNameNonInitialChar = /[a-zA-Z0-9_\-]+/;

        function escapeQuotes(value) {
            return '"' + value.replace(/"/, '\\\"') + '"'
        }
        var Qualifier = (function() {
            function Qualifier() {}
            Qualifier.prototype.matches = function(oldValue) {
                if (oldValue === null) return false;
                if (this.attrValue === undefined) return true;
                if (!this.contains) return this.attrValue == oldValue;
                var tokens = oldValue.split(' ');
                for (var i = 0; i < tokens.length; i++) {
                    if (this.attrValue === tokens[i]) return true
                }
                return false
            };
            Qualifier.prototype.toString = function() {
                if (this.attrName === 'class' && this.contains) return '.' + this.attrValue;
                if (this.attrName === 'id' && !this.contains) return '#' + this.attrValue;
                if (this.contains) return '[' + this.attrName + '~=' + escapeQuotes(this.attrValue) + ']';
                if ('attrValue' in this) return '[' + this.attrName + '=' + escapeQuotes(this.attrValue) + ']';
                return '[' + this.attrName + ']'
            };
            return Qualifier
        })();
        var Selector = (function() {
            function Selector() {
                this.uid = Selector.nextUid++;
                this.qualifiers = []
            }
            try {
                Object.defineProperty(Selector.prototype, "caseInsensitiveTagName", {
                    get: function() {
                        return this.tagName.toUpperCase()
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Selector.prototype, "selectorString", {
                    get: function() {
                        return this.tagName + this.qualifiers.join('')
                    },
                    enumerable: true,
                    configurable: true
                })
            } catch (e) {};
            Selector.prototype.isMatching = function(el) {
                return el[Selector.matchesSelector](this.selectorString)
            };
            Selector.prototype.wasMatching = function(el, change, isMatching) {
                if (!change || !change.attributes) return isMatching;
                var tagName = change.isCaseInsensitive ? this.caseInsensitiveTagName : this.tagName;
                if (tagName !== '*' && tagName !== el.tagName) return false;
                var attributeOldValues = [];
                var anyChanged = false;
                for (var i = 0; i < this.qualifiers.length; i++) {
                    var qualifier = this.qualifiers[i];
                    var oldValue = change.getAttributeOldValue(qualifier.attrName);
                    attributeOldValues.push(oldValue);
                    anyChanged = anyChanged || (oldValue !== undefined)
                }
                if (!anyChanged) return isMatching;
                for (var i = 0; i < this.qualifiers.length; i++) {
                    var qualifier = this.qualifiers[i];
                    var oldValue = attributeOldValues[i];
                    if (oldValue === undefined) oldValue = el.getAttribute(qualifier.attrName);
                    if (!qualifier.matches(oldValue)) return false
                }
                return true
            };
            Selector.prototype.matchabilityChange = function(el, change) {
                var isMatching = this.isMatching(el);
                if (isMatching) return this.wasMatching(el, change, isMatching) ? Movement.STAYED_IN : Movement.ENTERED;
                else return this.wasMatching(el, change, isMatching) ? Movement.EXITED : Movement.STAYED_OUT
            };
            Selector.parseSelectors = function(input) {
                var selectors = [];
                var currentSelector;
                var currentQualifier;

                function newSelector() {
                    if (currentSelector) {
                        if (currentQualifier) {
                            currentSelector.qualifiers.push(currentQualifier);
                            currentQualifier = undefined
                        }
                        selectors.push(currentSelector)
                    }
                    currentSelector = new Selector()
                }

                function newQualifier() {
                    if (currentQualifier) currentSelector.qualifiers.push(currentQualifier);
                    currentQualifier = new Qualifier()
                }
                var WHITESPACE = /\s/;
                var valueQuoteChar;
                var SYNTAX_ERROR = 'Invalid or unsupported selector syntax.';
                var SELECTOR = 1;
                var TAG_NAME = 2;
                var QUALIFIER = 3;
                var QUALIFIER_NAME_FIRST_CHAR = 4;
                var QUALIFIER_NAME = 5;
                var ATTR_NAME_FIRST_CHAR = 6;
                var ATTR_NAME = 7;
                var EQUIV_OR_ATTR_QUAL_END = 8;
                var EQUAL = 9;
                var ATTR_QUAL_END = 10;
                var VALUE_FIRST_CHAR = 11;
                var VALUE = 12;
                var QUOTED_VALUE = 13;
                var SELECTOR_SEPARATOR = 14;
                var state = SELECTOR;
                var i = 0;
                while (i < input.length) {
                    var c = input[i++];
                    switch (state) {
                        case SELECTOR:
                            if (c.match(validNameInitialChar)) {
                                newSelector();
                                currentSelector.tagName = c;
                                state = TAG_NAME;
                                break
                            }
                            if (c == '*') {
                                newSelector();
                                currentSelector.tagName = '*';
                                state = QUALIFIER;
                                break
                            }
                            if (c == '.') {
                                newSelector();
                                newQualifier();
                                currentSelector.tagName = '*';
                                currentQualifier.attrName = 'class';
                                currentQualifier.contains = true;
                                state = QUALIFIER_NAME_FIRST_CHAR;
                                break
                            }
                            if (c == '#') {
                                newSelector();
                                newQualifier();
                                currentSelector.tagName = '*';
                                currentQualifier.attrName = 'id';
                                state = QUALIFIER_NAME_FIRST_CHAR;
                                break
                            }
                            if (c == '[') {
                                newSelector();
                                newQualifier();
                                currentSelector.tagName = '*';
                                currentQualifier.attrName = '';
                                state = ATTR_NAME_FIRST_CHAR;
                                break
                            }
                            if (c.match(WHITESPACE)) break;
                            throw Error(SYNTAX_ERROR);
                        case TAG_NAME:
                            if (c.match(validNameNonInitialChar)) {
                                currentSelector.tagName += c;
                                break
                            }
                            if (c == '.') {
                                newQualifier();
                                currentQualifier.attrName = 'class';
                                currentQualifier.contains = true;
                                state = QUALIFIER_NAME_FIRST_CHAR;
                                break
                            }
                            if (c == '#') {
                                newQualifier();
                                currentQualifier.attrName = 'id';
                                state = QUALIFIER_NAME_FIRST_CHAR;
                                break
                            }
                            if (c == '[') {
                                newQualifier();
                                currentQualifier.attrName = '';
                                state = ATTR_NAME_FIRST_CHAR;
                                break
                            }
                            if (c.match(WHITESPACE)) {
                                state = SELECTOR_SEPARATOR;
                                break
                            }
                            if (c == ',') {
                                state = SELECTOR;
                                break
                            }
                            throw Error(SYNTAX_ERROR);
                        case QUALIFIER:
                            if (c == '.') {
                                newQualifier();
                                currentQualifier.attrName = 'class';
                                currentQualifier.contains = true;
                                state = QUALIFIER_NAME_FIRST_CHAR;
                                break
                            }
                            if (c == '#') {
                                newQualifier();
                                currentQualifier.attrName = 'id';
                                state = QUALIFIER_NAME_FIRST_CHAR;
                                break
                            }
                            if (c == '[') {
                                newQualifier();
                                currentQualifier.attrName = '';
                                state = ATTR_NAME_FIRST_CHAR;
                                break
                            }
                            if (c.match(WHITESPACE)) {
                                state = SELECTOR_SEPARATOR;
                                break
                            }
                            if (c == ',') {
                                state = SELECTOR;
                                break
                            }
                            throw Error(SYNTAX_ERROR);
                        case QUALIFIER_NAME_FIRST_CHAR:
                            if (c.match(validNameInitialChar)) {
                                currentQualifier.attrValue = c;
                                state = QUALIFIER_NAME;
                                break
                            }
                            throw Error(SYNTAX_ERROR);
                        case QUALIFIER_NAME:
                            if (c.match(validNameNonInitialChar)) {
                                currentQualifier.attrValue += c;
                                break
                            }
                            if (c == '.') {
                                newQualifier();
                                currentQualifier.attrName = 'class';
                                currentQualifier.contains = true;
                                state = QUALIFIER_NAME_FIRST_CHAR;
                                break
                            }
                            if (c == '#') {
                                newQualifier();
                                currentQualifier.attrName = 'id';
                                state = QUALIFIER_NAME_FIRST_CHAR;
                                break
                            }
                            if (c == '[') {
                                newQualifier();
                                state = ATTR_NAME_FIRST_CHAR;
                                break
                            }
                            if (c.match(WHITESPACE)) {
                                state = SELECTOR_SEPARATOR;
                                break
                            }
                            if (c == ',') {
                                state = SELECTOR;
                                break
                            }
                            throw Error(SYNTAX_ERROR);
                        case ATTR_NAME_FIRST_CHAR:
                            if (c.match(validNameInitialChar)) {
                                currentQualifier.attrName = c;
                                state = ATTR_NAME;
                                break
                            }
                            if (c.match(WHITESPACE)) break;
                            throw Error(SYNTAX_ERROR);
                        case ATTR_NAME:
                            if (c.match(validNameNonInitialChar)) {
                                currentQualifier.attrName += c;
                                break
                            }
                            if (c.match(WHITESPACE)) {
                                state = EQUIV_OR_ATTR_QUAL_END;
                                break
                            }
                            if (c == '~') {
                                currentQualifier.contains = true;
                                state = EQUAL;
                                break
                            }
                            if (c == '=') {
                                currentQualifier.attrValue = '';
                                state = VALUE_FIRST_CHAR;
                                break
                            }
                            if (c == ']') {
                                state = QUALIFIER;
                                break
                            }
                            throw Error(SYNTAX_ERROR);
                        case EQUIV_OR_ATTR_QUAL_END:
                            if (c == '~') {
                                currentQualifier.contains = true;
                                state = EQUAL;
                                break
                            }
                            if (c == '=') {
                                currentQualifier.attrValue = '';
                                state = VALUE_FIRST_CHAR;
                                break
                            }
                            if (c == ']') {
                                state = QUALIFIER;
                                break
                            }
                            if (c.match(WHITESPACE)) break;
                            throw Error(SYNTAX_ERROR);
                        case EQUAL:
                            if (c == '=') {
                                currentQualifier.attrValue = '';
                                state = VALUE_FIRST_CHAR;
                                break
                            }
                            throw Error(SYNTAX_ERROR);
                        case ATTR_QUAL_END:
                            if (c == ']') {
                                state = QUALIFIER;
                                break
                            }
                            if (c.match(WHITESPACE)) break;
                            throw Error(SYNTAX_ERROR);
                        case VALUE_FIRST_CHAR:
                            if (c.match(WHITESPACE)) break;
                            if (c == '"' || c == "'") {
                                valueQuoteChar = c;
                                state = QUOTED_VALUE;
                                break
                            }
                            currentQualifier.attrValue += c;
                            state = VALUE;
                            break;
                        case VALUE:
                            if (c.match(WHITESPACE)) {
                                state = ATTR_QUAL_END;
                                break
                            }
                            if (c == ']') {
                                state = QUALIFIER;
                                break
                            }
                            if (c == "'" || c == '"') throw Error(SYNTAX_ERROR);
                            currentQualifier.attrValue += c;
                            break;
                        case QUOTED_VALUE:
                            if (c == valueQuoteChar) {
                                state = ATTR_QUAL_END;
                                break
                            }
                            currentQualifier.attrValue += c;
                            break;
                        case SELECTOR_SEPARATOR:
                            if (c.match(WHITESPACE)) break;
                            if (c == ',') {
                                state = SELECTOR;
                                break
                            }
                            throw Error(SYNTAX_ERROR)
                    }
                }
                switch (state) {
                    case SELECTOR:
                    case TAG_NAME:
                    case QUALIFIER:
                    case QUALIFIER_NAME:
                    case SELECTOR_SEPARATOR:
                        newSelector();
                        break;
                    default:
                        throw Error(SYNTAX_ERROR)
                }
                if (!selectors.length) throw Error(SYNTAX_ERROR);
                return selectors
            };
            Selector.nextUid = 1;
            Selector.matchesSelector = (function() {
                var element = _7.createElement('div');
                if (typeof element['webkitMatchesSelector'] === 'function') return 'webkitMatchesSelector';
                if (typeof element['mozMatchesSelector'] === 'function') return 'mozMatchesSelector';
                if (typeof element['msMatchesSelector'] === 'function') return 'msMatchesSelector';
                return 'matchesSelector'
            })();
            return Selector
        })();
        var attributeFilterPattern = /^([a-zA-Z:_]+[a-zA-Z0-9_\-:\.]*)$/;

        function validateAttribute(attribute) {
            if (typeof attribute != 'string') throw Error('Invalid request opion. attribute must be a non-zero length string.');
            attribute = attribute.trim();
            if (!attribute) throw Error('Invalid request opion. attribute must be a non-zero length string.');
            if (!attribute.match(attributeFilterPattern)) throw Error('Invalid request option. invalid attribute name: ' + attribute);
            return attribute
        }

        function validateElementAttributes(attribs) {
            if (!attribs.trim().length) throw Error('Invalid request option: elementAttributes must contain at least one attribute.');
            var lowerAttributes = {};
            var attributes = {};
            var tokens = attribs.split(/\s+/);
            for (var i = 0; i < tokens.length; i++) {
                var name = tokens[i];
                if (!name) continue;
                var name = validateAttribute(name);
                var nameLower = name.toLowerCase();
                if (lowerAttributes[nameLower]) throw Error('Invalid request option: observing multiple case variations of the same attribute is not supported.');
                attributes[name] = true;
                lowerAttributes[nameLower] = true
            }
            return Object.keys(attributes)
        }

        function elementFilterAttributes(selectors) {
            var attributes = {};
            selectors.forEach(function(selector) {
                selector.qualifiers.forEach(function(qualifier) {
                    attributes[qualifier.attrName] = true
                })
            });
            return Object.keys(attributes)
        }
        var MutationSummary = (function() {
            function MutationSummary(opts) {
                var _27 = this;
                this.connected = false;
                this.options = MutationSummary.validateOptions(opts);
                this.observerOptions = MutationSummary.createObserverOptions(this.options.queries);
                this.root = this.options.rootNode;
                this.callback = this.options.callback;
                this.elementFilter = Array.prototype.concat.apply([], this.options.queries.map(function(query) {
                    return query.elementFilter ? query.elementFilter : []
                }));
                if (!this.elementFilter.length) this.elementFilter = undefined;
                this.calcReordered = this.options.queries.some(function(query) {
                    return query.all
                });
                this.queryValidators = [];
                if (MutationSummary.createQueryValidator) {
                    this.queryValidators = this.options.queries.map(function(query) {
                        return MutationSummary.createQueryValidator(_27.root, query)
                    })
                }
                this.observer = MutationObserverCtor ? new MutationObserverCtor(function(mutations) {
                    _27.observerCallback(mutations)
                }) : {
                    observe: function() {}
                };
                this.reconnect()
            }
            MutationSummary.createObserverOptions = function(queries) {
                var observerOptions = {
                    childList: true,
                    subtree: true
                };
                var attributeFilter;

                function observeAttributes(attributes) {
                    if (observerOptions.attributes && !attributeFilter) return;
                    observerOptions.attributes = true;
                    observerOptions.attributeOldValue = true;
                    if (!attributes) {
                        attributeFilter = undefined;
                        return
                    }
                    attributeFilter = attributeFilter || {};
                    attributes.forEach(function(attribute) {
                        attributeFilter[attribute] = true;
                        attributeFilter[attribute.toLowerCase()] = true
                    })
                }
                queries.forEach(function(query) {
                    if (query.characterData) {
                        observerOptions.characterData = true;
                        observerOptions.characterDataOldValue = true;
                        return
                    }
                    if (query.all) {
                        observeAttributes();
                        observerOptions.characterData = true;
                        observerOptions.characterDataOldValue = true;
                        return
                    }
                    if (query.attribute) {
                        observeAttributes([query.attribute.trim()]);
                        return
                    }
                    var attributes = elementFilterAttributes(query.elementFilter).concat(query.attributeList || []);
                    if (attributes.length) observeAttributes(attributes)
                });
                if (attributeFilter) observerOptions.attributeFilter = Object.keys(attributeFilter);
                return observerOptions
            };
            MutationSummary.validateOptions = function(options) {
                for (var prop in options) {
                    if (!(prop in MutationSummary.optionKeys)) throw Error('Invalid option: ' + prop)
                }
                if (typeof options.callback !== 'function') throw Error('Invalid options: callback is required and must be a function');
                if (!options.queries || !options.queries.length) throw Error('Invalid options: queries must contain at least one query request object.');
                var opts = {
                    callback: options.callback,
                    rootNode: options.rootNode || _7,
                    observeOwnChanges: !!options.observeOwnChanges,
                    oldPreviousSibling: !!options.oldPreviousSibling,
                    queries: []
                };
                for (var i = 0; i < options.queries.length; i++) {
                    var request = options.queries[i];
                    if (request.all) {
                        if (Object.keys(request).length > 1) throw Error('Invalid request option. all has no options.');
                        opts.queries.push({
                            all: true
                        });
                        continue
                    }
                    if ('attribute' in request) {
                        var query = {
                            attribute: validateAttribute(request.attribute)
                        };
                        query.elementFilter = Selector.parseSelectors('*[' + query.attribute + ']');
                        if (Object.keys(request).length > 1) throw Error('Invalid request option. attribute has no options.');
                        opts.queries.push(query);
                        continue
                    }
                    if ('element' in request) {
                        var requestOptionCount = Object.keys(request).length;
                        var query = {
                            element: request.element,
                            elementFilter: Selector.parseSelectors(request.element)
                        };
                        if (request.hasOwnProperty('elementAttributes')) {
                            query.attributeList = validateElementAttributes(request.elementAttributes);
                            requestOptionCount--
                        }
                        if (requestOptionCount > 1) throw Error('Invalid request option. element only allows elementAttributes option.');
                        opts.queries.push(query);
                        continue
                    }
                    if (request.characterData) {
                        if (Object.keys(request).length > 1) throw Error('Invalid request option. characterData has no options.');
                        opts.queries.push({
                            characterData: true
                        });
                        continue
                    }
                    throw Error('Invalid request option. Unknown query request.')
                }
                return opts
            };
            MutationSummary.prototype.createSummaries = function(mutations) {
                if (!mutations || !mutations.length) return [];
                var projection = new MutationProjection(this.root, mutations, this.elementFilter, this.calcReordered, this.options.oldPreviousSibling);
                var summaries = [];
                for (var i = 0; i < this.options.queries.length; i++) {
                    summaries.push(new Summary(projection, this.options.queries[i]))
                }
                return summaries
            };
            MutationSummary.prototype.checkpointQueryValidators = function() {
                this.queryValidators.forEach(function(validator) {
                    if (validator) validator.recordPreviousState()
                })
            };
            MutationSummary.prototype.runQueryValidators = function(summaries) {
                this.queryValidators.forEach(function(validator, index) {
                    if (validator) validator.validate(summaries[index])
                })
            };
            MutationSummary.prototype.changesToReport = function(summaries) {
                return summaries.some(function(summary) {
                    var summaryProps = ['added', 'removed', 'reordered', 'reparented', 'valueChanged', 'characterDataChanged'];
                    if (summaryProps.some(function(prop) {
                            return summary[prop] && summary[prop].length
                        })) return true;
                    if (summary.attributeChanged) {
                        var attrNames = Object.keys(summary.attributeChanged);
                        var attrsChanged = attrNames.some(function(attrName) {
                            return !!summary.attributeChanged[attrName].length
                        });
                        if (attrsChanged) return true
                    }
                    return false
                })
            };
            MutationSummary.prototype.observerCallback = function(mutations) {
                if (!this.options.observeOwnChanges) this.observer.disconnect();
                var summaries = this.createSummaries(mutations);
                this.runQueryValidators(summaries);
                if (this.options.observeOwnChanges) this.checkpointQueryValidators();
                if (this.changesToReport(summaries)) this.callback(summaries);
                if (!this.options.observeOwnChanges && this.connected) {
                    this.checkpointQueryValidators();
                    this.observer.observe(this.root, this.observerOptions)
                }
            };
            MutationSummary.prototype.reconnect = function() {
                if (this.connected) throw Error('Already connected');
                this.observer.observe(this.root, this.observerOptions);
                this.connected = true;
                this.checkpointQueryValidators()
            };
            MutationSummary.prototype.takeSummaries = function() {
                if (!this.connected) throw Error('Not connected');
                var summaries = this.createSummaries(this.observer.takeRecords());
                return this.changesToReport(summaries) ? summaries : undefined
            };
            MutationSummary.prototype.disconnect = function() {
                var summaries = this.takeSummaries();
                this.observer.disconnect();
                this.connected = false;
                return summaries
            };
            MutationSummary.NodeMap = NodeMap;
            MutationSummary.parseElementFilter = Selector.parseSelectors;
            MutationSummary.optionKeys = {
                'callback': true,
                'queries': true,
                'rootNode': true,
                'oldPreviousSibling': true,
                'observeOwnChanges': true
            };
            return MutationSummary
        })();
        var TreeMirrorClient = (function() {
            function TreeMirrorClient(target, mirror, testingQueries) {
                var _27 = this;
                this.target = target;
                this.mirror = mirror;
                this.nextId = 1;
                this.knownNodes = new MutationSummary.NodeMap();
                var rootId = this.serializeNode(target).id;
                var children = [];
                for (var child = target.firstChild; child; child = child.nextSibling) {
                    var serializedChild = this.serializeNode(child, true, true, true);
                    if (serializedChild) children.push(serializedChild)
                }
                this.mirror.initialize(rootId, children);
                var self = this;
                var queries = [{
                    all: true
                }];
                if (testingQueries) queries = queries.concat(testingQueries);
                this.mutationSummary = new MutationSummary({
                    rootNode: target,
                    callback: function(summaries) {
                        _27.applyChanged(summaries)
                    },
                    queries: queries
                })
            }
            TreeMirrorClient.prototype.disconnect = function() {
                if (this.mutationSummary) {
                    this.mutationSummary.disconnect();
                    this.mutationSummary = undefined
                }
            };
            TreeMirrorClient.prototype.rememberNode = function(node) {
                var id = this.nextId++;
                this.knownNodes.set(node, id);
                return id
            };
            TreeMirrorClient.prototype.forgetNode = function(node) {
                this.knownNodes.deleteNode(node)
            };
            TreeMirrorClient.prototype.serializeNode = function(node, recursive, setInputValues, isInitial) {
                if (node === null) return null;
                var id = this.knownNodes.get(node);
                if (id !== undefined) {
                    if (!isInitial) return {
                        id: id
                    };
                    else _6("Found duplicated node during initial DOM: " + id)
                }
                var data = {
                    nodeType: node.nodeType,
                    id: this.rememberNode(node)
                };
                switch (data.nodeType) {
                    case 10:
                        data.name = node.name;
                        data.publicId = node.publicId;
                        data.systemId = node.systemId;
                        break;
                    case 8:
                    case 3:
                        if (node.nodeType === 8 && node.textContent.indexOf("[if") !== 0 && node.textContent.indexOf("<![endif]") !== 0) break;
                        data.textContent = node.textContent.replace(/[\x20\r\n]+/g, ' ');
                        if (!_13.keyLogging && node.parentNode && node.parentNode.tagName === "TEXTAREA" && data.textContent) data.textContent = data.textContent.replace(/./g, '*');
                        break;
                    case 1:
                        if (node.tagName === 'IFRAME' && node.parentNode && node.parentNode.tagName === 'HEAD') {
                            data.nodeType = 8;
                            data.textContent = '';
                            break
                        }
                        data.tagName = node.tagName;
                        if (node.attributes['data-mf-replace']) {
                            var _83 = node.attributes['data-mf-replace'].value;
                            data = _224.call(this, _83, function(_29) {
                                return this.serializeNode(_29, true, setInputValues)
                            })[0];
                            break
                        }
                        if (node.tagName === 'SCRIPT') break;
                        data.attributes = {};
                        var valueSet = false;
                        for (var i = 0; i < node.attributes.length; i++) {
                            var attr = node.attributes[i];
                            if (_312(attr.name.toLowerCase())) continue;
                            if (setInputValues && node.tagName === "INPUT" && node.type === "text" && node.value && attr.name.toLowerCase() === "value") {
                                data.attributes[attr.name] = node.value;
                                valueSet = true
                            } else data.attributes[attr.name] = attr.value
                        }
                        if (node.tagName === 'IFRAME' && node.offsetWidth <= 1 && node.offsetHeight <= 1) data.attributes.src = '';
                        if (setInputValues && node.tagName === "INPUT" && node.type === "text" && !valueSet && node.value) data.attributes.value = node.value;
                        if (node.tagName === 'INPUT' && node.type === 'hidden' && data.attributes.value) data.attributes.value = '';
                        if (_391(node, data, _13)) data.attributes.value = data.attributes.value.replace(/./g, _188(node.type));
                        if (node.attributes['data-mf-replace-inner']) {
                            var _83 = node.attributes['data-mf-replace-inner'].value;
                            data.childNodes = _224.call(this, _83, function(_29) {
                                return this.serializeNode(_29, true, setInputValues)
                            });
                            break
                        }
                        if (recursive && node.childNodes.length) {
                            data.childNodes = [];
                            var _68 = false;
                            for (var child = node.firstChild; child; child = child.nextSibling) {
                                if (_222(child)) _68 = true;
                                else if (_221(child.previousSibling)) _68 = false;
                                if (_68) continue;
                                var serializedChild = this.serializeNode(child, true, setInputValues);
                                if (serializedChild) {
                                    data.childNodes.push(serializedChild)
                                }
                            }
                        }
                        break
                }
                return data
            };
            TreeMirrorClient.prototype.serializeAddedAndMoved = function(added, reparented, reordered) {
                var _27 = this;
                var all = added.concat(reparented).concat(reordered);
                var parentMap = new MutationSummary.NodeMap();
                all.forEach(function(node) {
                    var parent = node.parentNode;
                    var children = parentMap.get(parent);
                    if (!children) {
                        children = new MutationSummary.NodeMap();
                        parentMap.set(parent, children)
                    }
                    children.set(node, true)
                });
                var moved = [];
                parentMap.keys().forEach(function(parent) {
                    var children = parentMap.get(parent);
                    var keys = children.keys();
                    while (keys.length) {
                        var node = keys[0];
                        while (node.previousSibling && children.has(node.previousSibling)) node = node.previousSibling;
                        var _68 = false;
                        while (node && children.has(node)) {
                            if (_222(node)) _68 = true;
                            else if (_221(node.previousSibling)) _68 = false;
                            if (!_68) {
                                var data = _27.serializeNode(node);
                                if (data) {
                                    var _120 = node.previousSibling;
                                    while (_120 && !data.previousSibling) {
                                        data.previousSibling = _27.serializeNode(_120);
                                        _120 = _120.previousSibling
                                    }
                                    data.parentNode = _27.serializeNode(node.parentNode);
                                    moved.push(data)
                                }
                            }
                            children.deleteNode(node);
                            node = node.nextSibling
                        }
                        var keys = children.keys()
                    }
                });
                return moved
            };
            TreeMirrorClient.prototype.serializeAttributeChanges = function(attributeChanged) {
                var _27 = this;
                var map = new MutationSummary.NodeMap();
                Object.keys(attributeChanged).forEach(function(attrName) {
                    attributeChanged[attrName].forEach(function(element) {
                        var record = map.get(element);
                        if (!record) {
                            record = _27.serializeNode(element);
                            if (record) {
                                record.attributes = {};
                                map.set(element, record)
                            }
                        }
                        if (record) record.attributes[attrName] = element.getAttribute(attrName)
                    })
                });
                return map.keys().map(function(node) {
                    return map.get(node)
                })
            };
            TreeMirrorClient.prototype.applyChanged = function(summaries) {
                var _27 = this;
                var summary = summaries[0];
                var removed = summary.removed.map(function(node) {
                    return _27.serializeNode(node)
                });
                var moved = this.serializeAddedAndMoved(summary.added, summary.reparented, summary.reordered);
                var attributes = this.serializeAttributeChanges(summary.attributeChanged);
                var text = summary.characterDataChanged.map(function(node) {
                    var data = _27.serializeNode(node);
                    if (data) data.textContent = node.textContent;
                    return data
                });
                this.mirror.applyChanged(summary, {
                    removed: removed,
                    addedOrMoved: moved,
                    attributes: attributes,
                    text: text
                });
                summary.removed.forEach(function(node) {
                    _27.forgetNode(node)
                })
            };
            return TreeMirrorClient
        })();

        function _224(_83, _308) {
            var _10 = [];
            var _137 = _7.createElement('div');
            _137.innerHTML = _83;
            for (var i = 0; i < _137.childNodes.length; i++) {
                var _309 = _137.childNodes[i];
                var _310 = _308.call(this, _309);
                _10.push(_310)
            }
            return _10
        }

        function _222(_29) {
            return _29 && _29.nodeType === 8 && _29.textContent.trim().toLowerCase().indexOf('mouseflowexcludestart') === 0
        }

        function _221(_29) {
            return _29 && _29.nodeType === 8 && _29.textContent.trim().toLowerCase().indexOf('mouseflowexcludeend') === 0
        }

        function _312(_176) {
            return /^(onbeforeunload|onblur|onchange|onclick|onfocus|oninput|onkeydown|onkeypress|onkeyup|onload|onmousedown|onmouseenter|onmouseleave|onmousemove|onmouseout|onmouseover|onmouseup|onresize|onsubmit|ontouchcancel|ontouchend|ontouchenter|ontouchleave|ontouchmove|ontouchstart|onunload)$/.test(_176)
        }

        function _64(_227) {
            var _17 = '';
            if (typeof Prototype !== "undefined" && !_192(Prototype.Version, '1.7')) {
                var _313 = Array.prototype.toJSON;
                delete Array.prototype.toJSON;
                _17 = JSON.stringify(_227);
                Array.prototype.toJSON = _313
            } else {
                _17 = JSON.stringify(_227)
            }
            return _17
        }

        function _215(_34, _8) {
            _13[_34] = _8
        }

        function _314() {
            return {
                debug: _1.mouseflowDebug || _36.search.indexOf('mf_debug=1') !== -1,
                includeDebugTime: false,
                forceStart: _36.search.indexOf('mf_force=1') !== -1,
                autoStart: _1.mouseflowAutoStart !== false && _36.search.indexOf('mf_autostart=0') === -1,
                touchEvents: !_1.mouseflowDisableTouch,
                htmlDelay: _1.mouseflowHtmlDelay || 1000,
                compress: _1.mouseflowCompress !== false && _36.search.indexOf('mf_compress=0') === -1,
                autoTagging: _1.mouseflowAutoTagging !== false,
                path: _1.mouseflowPath,
                crossDomainSupport: _1.mouseflowCrossDomainSupport,
                href: _1.mouseflowHref || _36.href,
                htmlFetchMode: _1.mouseflowHtmlFetchMode || 'post',
                sessionId: _1.mouseflowSessionId,
                honorDoNotTrack: _1.mouseflowHonorDoNotTrack,
                keyLogging: !_1.mouseflowDisableKeyLogging,
                relativeMouseMove: _1.mouseflowEnableRelativeMouseMove,
                compressAjax: _1.mouseflowCompressAjax !== false,
                domReuse: _1.mouseflowDisableDomReuse !== false,
                domDeduplicator: !_1.mouseflowDisableDomDeduplicator,
                includeSubDomains: !_1.mouseflowExcludeSubDomains,
                registerSubmitTimeout: _1.mouseflowRegisterSubmitTimeout || 2000,
                useUnload: _1.mouseflowUseUnload
            }
        }

        function _78() {
            _296();
            _6("Recording starting, version " + _169);
            if (_376()) {
                _374();
                _4._56 = _381(_0._322);
                if (_383()) {
                    _4._20 = _174();
                    _0._52 = [];
                    _0._91 = 0
                }
                _0._161 = _287();
                var _94 = "?v=" + _169 + "&p=" + _45 + "&s=" + _4._20 + "&page=" + _4._56 + "&ret=" + (_4._97 ? "1" : "0") + "&u=" + _4._59 + "&href=" + _50(_13.href) + (_13.path ? "&path=" + _50(_13.path) : "") + "&ref={referrer}" + "&title=" + _50(_7.title) + "&res=" + _1.screen.width + "x" + _1.screen.height + "&tz=" + _385() + "&to=" + _4._212 + "&jq=" + _4._170 + "&ori=" + (typeof _1.orientation != "undefined" ? _1.orientation : "") + "&dw=" + _7.documentElement.clientWidth + "&dh=" + _7.documentElement.clientHeight + "&pxr=" + (typeof _1.devicePixelRatio != "undefined" ? _1.devicePixelRatio : 1) + "&css=1" + (_0._161.length > 0 ? "&fw=" + _0._161.join(',') : "");
                var _65 = _7.referrer;
                if (_94.replace("{referrer}", _50(_65)).length > 2048) {
                    if (_65.indexOf("?") > -1) _65 = _65.split("?")[0];
                    if (_94.replace("{referrer}", _50(_65)).length > 2048) _65 = ""
                }
                _94 = _94.replace("{referrer}", _50(_65));
                _73({
                    _37: _77 + "a.gif" + _94,
                    _93: function(_35) {
                        if (_13.crossDomainSupport) _1.name = "mf_" + _4._20;
                        if (_35._251 === "Recording blocked") {
                            _6("Recording not started - mf_block cookie set to 1");
                            return
                        }
                        _1._mfq = new _218(_mfq);
                        _82 = true;
                        _281();
                        _318();
                        _85._78()
                    },
                    _389: true,
                    _55: function() {
                        _6("Error in transmitCrossDomain - recording not starting.")
                    }
                });
                if (_0._79 && _0._79 != "") {
                    if (_0._79 != _51(_36.pathname)) _183();
                    _0._79 = null
                }
                _232();
                _0._42 = {
                    x: _19(_7).scrollLeft(),
                    y: _19(_7).scrollTop()
                };
                if (_0._42.x != 0 && _0._42.y != 0) _276();
                _0._76 = 1;
                _163();
                _6("Recording started. Session: " + _4._20 + ", Page: " + _4._56 + ", Last page: " + _4._138)
            }
        }

        function _58() {
            _144 = false;
            _156();
            _1.clearInterval(_166);
            _1.clearInterval(_151);
            _1.clearTimeout(_90);
            if (_96) {
                _1.clearTimeout(_96);
                _268()
            }
            _9(20, {});
            _115();
            _82 = false;
            try {
                _217.disconnect()
            } catch (e) {}
            _85._58();
            _163();
            _0 = _213();
            _6("Recording stopped")
        }

        function _332(_22) {
            if (!_144) {
                _6("New page view skipped. Current page view is not initialized yet.");
                return
            }
            if (typeof _22 != "undefined") _13.path = _22;
            _58();
            _13.htmlDelay = 500;
            _78();
            _9(14, {
                x: 0,
                y: _19(_7).height()
            })
        }

        function _334() {
            _58();
            _7.cookie = "mf_" + _45 + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/; domain=" + _133(_36) + ";"
        }

        function _318() {
            if (_13.htmlFetchMode === 'post') {
                _1.setTimeout(function() {
                    _319()
                }, _13.htmlDelay)
            } else {
                _6("Html not sent due to mouseflowHtmlFecthMode setting")
            }
        }

        function _319() {
            _217 = new TreeMirrorClient(_7, {
                initialize: function(rootId, children) {
                    _144 = true;
                    _282({
                        data: {
                            f: 'initialize',
                            args: [rootId, children]
                        }
                    }, _7.documentElement.innerHTML.length);
                    _154()
                },
                applyChanged: function(summary, serializedSummary) {
                    if ((+new Date() - _0._26) - _0._114 < 300000) {
                        _321({
                            data: {
                                f: 'applyChanged',
                                args: [serializedSummary.removed, serializedSummary.addedOrMoved, serializedSummary.attributes, serializedSummary.text]
                            }
                        });
                        if (summary.added && summary.added.length) {
                            _154(summary.added)
                        }
                    }
                }
            })
        }

        function _220(_34, _8, _333, _116) {
            if (!_34) return;
            _8 = _8 || "";
            var _147 = _284(_34);
            if (_147 > -1) {
                if (_0._52[_147].split('_')[1] == _51(_8)) {
                    _6("Variable already set to same value, not triggering callback.");
                    return
                }
                _0._52[_147] = _51(_34) + "_" + _51(_8)
            } else if (_0._52.length < 20) {
                _0._52.push(_51(_34) + "_" + _51(_8))
            }
            _6("Setting custom variable: " + _34 + " = " + _8 + ", overwrite: " + (_116 === undefined ? true : _116));
            var _10 = {
                key: _34.toString(),
                value: _8.toString() || "",
                scope: _333 || "session",
                overwrite: _116 === undefined ? true : _116
            };
            _0._164.push(_10);
            _1.clearTimeout(_216);
            _216 = _1.setTimeout(_330, 1000)
        }

        function _330() {
            _148('variable', _0._164);
            _0._164 = []
        }

        function _117(_329) {
            _9(18, {
                target: _329
            })
        }

        function _316() {
            _9(18, {
                target: "*"
            })
        }

        function _307(_335) {
            _148('identify', {
                userId: _4._59,
                userName: _335
            })
        }

        function _223(_18) {
            _6("Registering form submit attempt on this page");
            _149(_18)
        }

        function _183(_18) {
            var _165 = +new Date() - _0._26;
            if (_0._61 || _165 > 5000) {
                _6("Registering form submit success on this page");
                if (!_0._61) _9(13, {
                    target: _18
                });
                _9(34, {});
                _0._61 = undefined
            } else {
                _6("Registering form submit success on previous page");
                _214(34)
            }
        }

        function _306(_18) {
            _6("Registering form submit failure on this page");
            var _165 = +new Date() - _0._26;
            if (_0._61 || _165 > 5000) {
                if (!_0._61) _9(13, {
                    target: _18
                });
                _9(35, {});
                _0._61 = undefined
            } else _214(35)
        }

        function _214(_325) {
            var _10 = [0, 0, 0, 0, 0, 0, 0, _325];
            var _324 = _200.e(_10) + "..";
            _73({
                _37: _77 + "c.gif?w=" + _45 + "&s=" + _4._20 + "&p=" + _4._138 + "&li=" + _0._123 + "&lh=" + _0._108 + "&ls=" + _0._111 + "&d=" + _324
            });
            _0._76++;
            _0._123 = _0._114;
            _0._108 = _0._43.y;
            _0._111 = _0._75.y
        }

        function _149(_18) {
            if ((+new Date()) - _0._219 < 20) return;
            _0._219 = +new Date();
            _9(13, {
                target: _18
            });
            if (!_0._162[_18]) {
                _0._162[_18] = _157(_18)
            } else {
                _242(_18, _157(_18), _0._162[_18])
            }
            _292(_18);
            _0._61 = +new Date()
        }

        function _323() {
            return {
                _20: "",
                _56: "",
                _59: "",
                _97: false,
                _212: +("ontouchstart" in _1 && _13.touchEvents),
                _170: "0",
                _138: "",
                _84: []
            }
        }

        function _213() {
            return {
                _322: new Date(),
                _26: +new Date(),
                _131: +new Date(),
                _145: 0,
                _10: [],
                _98: [],
                _49: [],
                _102: [],
                _244: [],
                _127: [],
                _63: [],
                _132: 0,
                _135: 0,
                _197: 0,
                _219: 0,
                _62: {
                    x: 0,
                    y: 0
                },
                _280: {
                    x: 0,
                    y: 0
                },
                _246: -100,
                _42: {
                    x: 0,
                    y: 0
                },
                _75: {
                    x: 0,
                    y: 0
                },
                _72: {},
                _158: -100,
                _141: -100,
                _43: {
                    x: 0,
                    y: 0
                },
                _140: [],
                _328: 0,
                _66: [],
                _164: [],
                _76: 1,
                _114: 0,
                _208: 0,
                _162: {},
                _52: [],
                _123: 0,
                _108: 0,
                _111: 0,
                _91: 0,
                _161: [],
                _84: []
            }
        }

        function _157(_18) {
            var _160 = _290(_18);
            var _17 = {};
            if (!_160) {
                _6("Form not found: " + _18);
                return _17
            }
            for (var i = 0; i < _160.elements.length; i++) {
                var _2 = _160.elements[i];
                var _38 = _2.name;
                if (!_38 || _38 == "") continue;
                if (_2.tagName && /input|select|button|textarea/.test(_2.tagName.toLowerCase()) && (!_2.type || !/hidden|submit|reset|image|button/.test(_2.type.toLowerCase()))) {
                    var _8 = _99(_2);
                    if (!_17[_38]) _17[_38] = _8;
                    else if (_8 && _8 != "") _17[_38] += ", " + _8
                }
            }
            return _17
        }

        function _99(_3) {
            var _8 = "";
            if (_3.type && /radio|checkbox/.test(_3.type.toLowerCase())) _8 = _3.checked ? _3.value : "";
            else if (_3.tagName && /select/.test(_3.tagName.toLowerCase()) && _3.options)
                for (var j = 0; j < _3.options.length; j++) {
                    var _167 = _3.options[j].selected ? _3.options[j].value : "";
                    if (_167 && _167 != "") _8 += (_8 && _8 != "" ? "," : "") + _167
                } else _8 = _3.value;
            return _8 || ''
        }

        function _211(_3) {
            if (_3.type === 'password') return '*';
            var _8 = _99(_3);
            if (_283(_3) && _286(_3)) _8 = _8.replace(/./g, _188(_3.type));
            return _8
        }

        function _283(_3) {
            return !_89(_3, 'mouseflow-force-keylogging') && (!_13.keyLogging || _89(_3, 'no-mouseflow'))
        }

        function _286(_3) {
            return _3.type !== 'checkbox' && _3.type !== 'radio' && _3.tagName !== 'SELECT'
        }

        function _386(_80) {
            return !_13.keyLogging || _89(_80.target, 'no-mouseflow') ? '191' : (_80.which && _80.which.toString()) || ''
        }

        function _387(_3) {
            var _243 = _24(_3);
            var _124 = _0._244[_243];
            var _107 = _211(_3);
            var _17 = _107;
            if (_124 && _124.length > 3 && _107.indexOf(_124) === 0) _17 = '+||' + _107.substring(_124.length);
            _0._244[_243] = _107;
            return _17
        }

        function _242(_18, _168, _152) {
            try {
                var _100 = [];
                for (var _21 in _168)
                    if (typeof _152[_21] == "undefined" || _168[_21] != _152[_21]) _100.push(_21);
                for (var _21 in _152)
                    if (typeof _168[_21] == "undefined" && _100.indexOf(_21) == -1) _100.push(_21);
                for (var i = 0; i < _100.length; i++) _9(37, {
                    target: _18 + "||" + _100[i]
                })
            } catch (_23) {
                _6("Error in _242: " + _23.message)
            }
        }

        function _292(_18) {
            try {
                var _86 = _301(_18);
                for (var i = 0; i < _86.length; i++) _9(36, {
                    target: _18 + "||" + _86[i]
                })
            } catch (_23) {
                _6("Error in getBlankFields: " + _23.message)
            }
        }

        function _301(_18) {
            var _86 = [];
            var _49 = _157(_18);
            for (var _21 in _49)
                if (_49[_21] == "") _86.push(_21);
            return _86
        }

        function _290(_18) {
            for (var j = 0; j < _7.forms.length; j++)
                if (_24(_7.forms[j]) == _18) {
                    return _7.forms[j]
                }
            return null
        }

        function _296() {
            _295();
            _285()
        }

        function _163() {
            _293();
            _362()
        }

        function _295() {
            var _130 = _231('mf_user').split('|');
            _4._59 = _130[0];
            if (_130.length > 1 && _130[1] !== '') _4._84 = _130[1].split(',');
            _4._97 = _4._59 !== '';
            if (_4._59 === '' || _4._59 === '1') _4._59 = _174()
        }

        function _293() {
            _186('mf_user', _4._59 + '|' + _4._84.join(','), 1, _133(_36))
        }

        function _285() {
            var _30 = _231("mf_" + _45).split("|");
            _4._20 = _30[0];
            if (_30.length > 1) _4._138 = _30[1];
            if (_30.length > 2) _0._145 = parseInt(_30[2], 10);
            if (_30.length > 3 && _30[3] != "") _0._52 = _30[3].split('.');
            if (_30.length > 4) _0._91 = parseInt(_30[4], 10);
            if (_30.length > 5) _0._79 = _30[5];
            if (_30.length > 6 && _30[6] !== '') _0._84 = _30[6].split(',');
            if (_30.length > 7) _4._97 = _30[6] === '1';
            if (_4._20 == "" && _13.sessionId) _4._20 = _13.sessionId;
            else if (_4._20 == "" && _1.name && _1.name.length == 35 && _1.name.indexOf("mf_") == 0) _4._20 = _1.name.substring(3)
        }

        function _362() {
            _186('mf_' + _45, _4._20 + '|' + _4._56 + '|' + (+new Date()) + '|' + _0._52.join('.') + '|' + _0._91 + '|' + (_0._79 || '') + '|' + _0._84.join(',') + '|' + (_4._97 ? '1' : '0'), 0, _133(_36))
        }

        function _374() {
            _0._26 = +new Date();
            _0._131 = +new Date();
            _166 = _1.setInterval(_276, _41._125);
            _151 = _1.setInterval(_338, _41._375);
            _90 = _1.setTimeout(_271, _41._159)
        }

        function _376() {
            if (_13.forceStart) return true;
            if (_378() || _379() || !_294(_36.hostname) || _377()) {
                return false
            }
            var _236 = _4._20 != "" || _185 <= 1 || _47.floor(_47.random() * _185) == 0;
            if (!_236) {
                _6("Recording not started - recordingRate or blocked");
                _186("mf_" + _45, "-1", 0, _133(_36))
            }
            return _236
        }

        function _377() {
            return _13.honorDoNotTrack && navigator.doNotTrack == 1
        }

        function _378() {
            if (_4._20 == "-1") {
                _6("Recording not started - session blocked earlier");
                return true
            }
            return false
        }

        function _379() {
            var result = _4._20 != "" && _4._20.length != 32;
            if (result) _6("Recording not started - Session Id was invalid");
            return result
        }

        function _384() {
            return (_0._91 < _41._337)
        }

        function _381(_60) {
            return _134(_60.getMonth() + 1, 2) + _134(_60.getDate(), 2) + _134(_60.getSeconds(), 2) + _134(_60.getMilliseconds(), 3).slice(1) + _174()
        }

        function _134(_382, _109) {
            return (new Array(_109 + 1).join('0') + _382).slice(-_109)
        }

        function _383() {
            return (_4._20 == "" || _4._20 == "-1" || (_0._145 > 0 && (+new Date() - _0._145 > _41._159)) || !_384())
        }

        function _385() {
            var _233 = new Date();
            return _47.max(new Date(_233.getFullYear(), 0, 1).getTimezoneOffset(), new Date(_233.getFullYear(), 6, 1).getTimezoneOffset())
        }

        function _320() {
            _156();
            _232()
        }

        function _232() {
            try {
                _154();
                try {
                    _19(_367()).on("mouseenter.mouseflow", function(_2) {
                        _9(6, {
                            x: _2.pageX,
                            y: _2.pageY,
                            target: _24(this)
                        })
                    }).on("mouseleave.mouseflow", function(_2) {
                        _9(7, {
                            x: _2.pageX,
                            y: _2.pageY,
                            target: _24(this)
                        })
                    })
                } catch (_23) {
                    _6("Error in getHoverSelectors: " + _23.message)
                }
                _19(_7).on("scroll.mouseflow", function() {
                    _0._42 = {
                        x: _19(_7).scrollLeft(),
                        y: _19(_7).scrollTop()
                    }
                }).on("mousemove.mouseflow", function(_2) {
                    _0._62 = {
                        x: _2.pageX,
                        y: _2.pageY
                    }
                }).on("click.mouseflow", "a, :input", function(_2) {
                    _139(_2, _24(this))
                }).on("click.mouseflow", function(_2) {
                    _139(_2, _24(_2.target))
                }).on("mousedown.mouseflow", "a, :input", function(_2) {
                    _9(3, {
                        x: _2.pageX,
                        y: _2.pageY,
                        target: _24(this)
                    })
                }).on("focus.mouseflow", ":input", function(_2) {
                    _9(11, {
                        target: _24(_2.target)
                    })
                }).on("blur.mouseflow", ":input", function(_2) {
                    _9(12, {
                        target: _24(_2.target)
                    })
                }).on("submit.mouseflow", "form", function(_2) {
                    _149(_24(_2.target))
                }).on("mouseleave.mouseflow", function(_2) {
                    _9(40, {})
                }).on('keypress.mouseflow', ':input:not([type=password])', function(_2) {
                    _9(8, {
                        target: _24(_2.target)
                    })
                }).on('keydown.mouseflow', ':input:not([type=password])', function(_2) {
                    _9(33, {
                        target: _24(_2.target),
                        value: _386(_2)
                    })
                }).on('keyup.mouseflow', ':input:not([type=password])', function(_2) {
                    _9(9, {
                        target: _24(_2.target),
                        value: _387(_2.target)
                    })
                }).on('change.mouseflow', ':input', function(_2) {
                    _9(10, {
                        target: _24(_2.target),
                        value: _211(_2.target)
                    })
                }).on('keyup.mouseflow', ':input:not([type=password])', function(_2) {
                    if (_142(_99(_2.target))) _117('payment')
                }).on('change.mouseflow', ':input:not([type=password])', function(_2) {
                    if (_142(_99(_2.target))) _117('payment')
                });
                if (_4._212) {
                    _19(_7).on("touchstart.mouseflow", function(_2) {
                        if (!_2.originalEvent || !_2.originalEvent.touches) return;
                        var _33 = _2.originalEvent.touches;
                        if (_33.length > 0) _9(21, {
                            x: _33[0].pageX,
                            y: _33[0].pageY
                        });
                        if (_33.length > 1) _9(25, {
                            x: _33[1].pageX,
                            y: _33[1].pageY
                        })
                    }).on("touchmove.mouseflow", function(_2) {
                        if (!_2.originalEvent || !_2.originalEvent.touches) return;
                        var _33 = _2.originalEvent.touches;
                        if (_33.length > 0 && _0._246 < (+new Date() - _0._26 - _41._125)) {
                            _9(22, {
                                x: _33[0].pageX,
                                y: _33[0].pageY
                            });
                            if (_33.length > 1) _9(26, {
                                x: _33[1].pageX,
                                y: _33[1].pageY
                            });
                            _0._246 = (+new Date() - _0._26);
                            if (!_71(_74(), _0._43)) {
                                _0._43 = _74();
                                _9(0, _0._43)
                            }
                            if (_0._141 < (+new Date() - _0._26 - _41._125) && !_71(_74(), _0._43)) {
                                _0._43 = _74();
                                _9(0, _0._43);
                                _0._141 = (+new Date() - _0._26)
                            }
                            _0._42 = {
                                x: _19(_7).scrollLeft(),
                                y: _19(_7).scrollTop()
                            };
                            if (_0._158 < (+new Date() - _0._26 - _41._125) && !_71(_0._42, _0._75)) {
                                _0._75 = _0._42;
                                _9(1, _0._42);
                                _0._158 = (+new Date() - _0._26)
                            }
                        }
                    }).on("touchend.mouseflow", function(_2) {
                        if (!_2.originalEvent || !_2.originalEvent.touches) return;
                        var _33 = _2.originalEvent.touches;
                        if (_33.length == 0) _9(23, {
                            x: 0,
                            y: 0
                        });
                        _9(27, {
                            x: 0,
                            y: 0
                        })
                    }).on("orientationchange.mouseflow", function() {
                        _9(24, {
                            x: _1.orientation,
                            y: 0
                        })
                    })
                }
                _19(_1).on(_397() + '.mouseflow', function() {
                    if (_0._61) {
                        if (+new Date() - _0._61 < _13.registerSubmitTimeout) {
                            _6("Registering formSubmit");
                            _0._79 = _51(_36.pathname)
                        } else {
                            _6("Not registering formSubmit. Timeout exceeded.")
                        }
                    }
                    _58()
                });
                var _193 = _1.onerror;
                _1.onerror = function(_229, _406, _401, _400) {
                    _9(15, {
                        x: _401 || 0,
                        y: _400 || 0
                    });
                    if (_193) _193.apply(this, arguments)
                };
                if (_13.keyLogging) _373()
            } catch (_23) {
                _6("Error in bindDomEvents: " + _23.message)
            }
        }

        function _154(_187) {
            _136('a,.mf-listen-click', 'click.mouseflow', function(_2) {
                _139(_2, _24(this))
            });
            _136('form', 'submit.mouseflow', function(_2) {
                _149(_24(_2.target))
            });
            _136('div,section,ul,.mf-scroll-listen', 'scroll.mouseflow', function(_2) {
                _351(_24(_2.target), _19(this).scrollLeft(), _19(this).scrollTop())
            });

            function _136(_16, _80, _394) {
                var _87 = _187 ? _19(_187).filter(_16) : _19(_16);
                _87.off(_80).on(_80, _394)
            }
        }

        function _188(_392) {
            return /number/i.test(_392) ? '0' : '*'
        }

        function _391(_29, _10, _13) {
            var isMaskableNode = _10.attributes.value && _29.tagName === 'INPUT' && !/checkbox|radio|button|submit|reset/.test(_29.type);
            var nodeShouldBeMasked = !_13.keyLogging || _89(_29, 'no-mouseflow') || _142(_10.attributes.value);
            return isMaskableNode && nodeShouldBeMasked
        }

        function _142(_8) {
            return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/.test(_8)
        }

        function _156() {
            _19('*').off('.mouseflow');
            _19(_1).off('.mouseflow');
            _19(_7).off('.mouseflow');
            if (_143) _1.clearInterval(_143)
        }

        function _373() {
            _0._102 = _190();
            _143 = _1.setInterval(function() {
                _348(_345(_190(), _0._102))
            }, 200)
        }

        function _190() {
            var _191 = _7.querySelectorAll("input,textarea,select");
            var _209 = {};
            for (var i = 0; i < _191.length; i++) {
                var _21 = _191[i];
                if (_89(_21, "no-mouseflow")) continue;
                if (!_342(_21, ["text", "textarea", "select-one"])) continue;
                _209[_24(_21)] = _99(_21)
            }
            return _209
        }

        function _89(_21, _341) {
            return _21.className && new RegExp("(^|\\s)" + _341 + "($|\\s)", 'i').test(_21.className)
        }

        function _342(_21, _343) {
            return _21.type && new RegExp(_343.join("|"), 'i').test(_21.type)
        }

        function _345(_102, _195) {
            var _101 = [];
            for (var _34 in _102) {
                var _8 = _102[_34];
                var _196 = _195[_34];
                if (_196 !== undefined && _196 !== _8) _101.push({
                    id: _34,
                    value: _8
                });
                _195[_34] = _8
            }
            return _101
        }

        function _348(_101) {
            if ((+new Date() - _0._26) - _0._208 > 100) {
                for (var i = 0; i < _101.length; i++) {
                    var _25 = _101[i];
                    _9(10, {
                        target: _25.id,
                        value: _25.value
                    })
                }
            }
        }

        function _139(_2, _67) {
            if ((+new Date()) - _0._197 < 20) return;
            _0._197 = +new Date();
            _9(5, {
                x: _2.pageX,
                y: _2.pageY,
                target: _67
            });
            var _70 = _270(_2.target, _2.pageX, _2.pageY);
            if (_70) _9(4, {
                x: _70.x,
                y: _70.y,
                target: _24(_2.target)
            })
        }

        function _351(_67, _352, _353) {
            _0._72[_67] = {
                x: _352,
                y: _353
            };
            if (_112) return;
            _112 = _1.setTimeout(_201, 100);

            function _201() {
                _112 = null;
                var _199 = true;
                for (var _53 in _0._72) {
                    if (_0._72.hasOwnProperty(_53)) {
                        _9(39, {
                            x: _0._72[_53].x,
                            y: _0._72[_53].y,
                            target: _53
                        });
                        _199 = false
                    }
                }
                if (!_199) {
                    _0._72 = {};
                    _112 = _1.setTimeout(_201, 100)
                }
            }
        }

        function _270(_29, _369, _368) {
            var _57 = _398(_29);
            if (_57 == null) return null;
            return {
                x: parseInt((_369 - _0._42.x - _57.x) / parseFloat(_57.width) * 65535),
                y: parseInt((_368 - _0._42.y - _57.y) / parseFloat(_57.height) * 65535)
            }
        }

        function _367() {
            var _204 = {};
            var _203 = /[^(]:hover/;
            for (var _5 = 0; _5 < _7.styleSheets.length; _5++) {
                var _104 = _7.styleSheets[_5];
                try {
                    var _366 = _104.cssRules ? _104.cssRules : _104.rules;
                    for (var _153 = 0; _153 < _366.length; _153++) {
                        var _202 = _104.cssRules[_153];
                        if (!_203.test(_202.selectorText)) continue;
                        var _106 = _202.selectorText.split(',');
                        var _16;
                        for (var _155 = 0; _155 < _106.length; _155++) {
                            _16 = _106[_155].replace(/^\s+|\s+$/g, '');
                            if (_203.test(_16)) {
                                _16 = _16.substring(0, _16.indexOf(":hover"));
                                _16 = _363(_16);
                                _204[_16] = true
                            }
                        }
                    }
                } catch (_23) {
                    _6("Cannot inspect external css file, :hover support may fail: " + _104.href)
                }
            }
            var _106 = ['a', 'input', 'select', 'button', 'textarea', 'li', 'canvas', '.mf-listen'];
            for (_16 in _204) {
                _16 = _16.replace(/^\s+|\s+$/g, '');
                if (_16 != "" && _16 != "a" && !_92(_16, " a") && !_92(_16, " select") && !_92(_16, " submit") && !_92(_16, " textarea") && !_92(_16, " li")) _106.push(_16)
            }
            return _106
        }

        function _363(_25) {
            var _206 = [/:active/g, /:visited/g, /::before/g, /:before/g, /::after/g, /:after/g, /::first-letter/g, /::first-line/g, /::selection/g];
            for (var _5 = 0; _5 < _206.length; _5++) _25 = _25.replace(_206[_5], "");
            return _25
        }

        function _50(_360) {
            try {
                return _1.encodeURIComponent(_360)
            } catch (_23) {
                _6("Encode error: " + _23.message);
                return ""
            }
        }

        function _9(_15, _11) {
            var _40 = [];
            var _103 = -1;
            if (_302(_15) && !_357(_11)) return;
            if (_361(_15)) {
                _1.clearTimeout(_90);
                _90 = _1.setTimeout(_271, _41._159);
                _0._114 = (+new Date() - _0._26)
            }
            if (_370(_15)) _0._208 = (+new Date() - _0._26);
            _175(_277(), _40);
            _40.push(_15);
            if (_11.x != undefined && _11.x < 0) _11.x = 0;
            if (_11.y != undefined && _11.y < 0) _11.y = 0;
            if (_11.x != undefined && _11.x > 65534) _11.x = 65534;
            if (_11.y != undefined && _11.y > 65534) _11.y = 65534;
            if (_11.x != undefined) _175(_11.x, _40);
            if (_11.y != undefined) _175(_11.y, _40);
            if (_11.target != undefined) {
                if (typeof _11.target == "object" && _11.target.id != undefined) _11.target = _11.target.id;
                if (_15 !== 18 && _11.target && _11.target.indexOf("||") === -1) {
                    var _3 = _261(_11.target);
                    if (_3 && _3.form) {
                        _11.target = _24(_3.form) + "||" + _11.target
                    }
                }
                for (var _5 = 0; _5 < _0._127.length; _5++)
                    if (_0._127[_5] == _11.target) {
                        _103 = _5;
                        break
                    }
                if (_11.target == "") _40.push(254);
                else if (_103 == -1) {
                    _40.push(_0._127.length);
                    _0._127.push(_11.target);
                    _0._63.push(_11.target);
                    _0._135 = _126(_0._63)
                } else _40.push(_103)
            } else if (_359(_15)) _40.push(255);
            if (_15 != 2) _6("Event, type: " + _15 + ", time: " + (+new Date() - _0._26) + ", details: " + _64(_11));
            var _8 = _11.value;
            if (_8 !== undefined) {
                if (_8 instanceof Array) _8 = _8.join(', ');
                _40.push(_0._49.length);
                _0._49.push(_8);
                _0._132 = _126(_0._49)
            }
            var totalDataSize = _0._10.length + _40.length + _0._135 + _0._132;
            if (totalDataSize > _41._356) {
                if (_8 !== undefined) _0._49.pop();
                if (_11.target && _103 == -1) _0._63.pop();
                _115();
                _0._10 = _40;
                _0._10[0] = 0;
                _0._10[1] = 0;
                if (_8 !== undefined) {
                    _0._10[_0._10.length - 1] = 0;
                    _0._49.push(_8)
                }
                if (_11.target && _103 == -1) _0._63.push(_11.target);
                _0._132 = _126(_0._49);
                _0._135 = _126(_0._63)
            } else {
                for (_5 = 0; _5 < _40.length; _5++) _0._10.push(_40[_5]);
                if (_15 == 23) {
                    _115()
                }
            }
        }

        function _277() {
            return +new Date() - _0._131
        }

        function _302(_15) {
            return (_15 >= 2 && _15 <= 7) || _15 == 41
        }

        function _357(_11) {
            return _11.x !== undefined && _11.y !== undefined && !isNaN(_11.x) && !isNaN(_11.y) && (_11.x > 0 || _11.y > 0)
        }

        function _359(_15) {
            return (_15 > 2 && _15 != 14 && _15 < 19) || _15 == 41
        }

        function _361(_15) {
            return _15 != 14 && _15 != 15 && _15 != 16 && _15 != 17 && _15 != 19 && _15 != 20 && _15 != 38
        }

        function _370(_15) {
            return _15 === 8 || _15 === 9 || _15 === 10 || _15 === 33
        }

        function _276() {
            if (!_71(_74(), _0._43)) {
                _0._43 = _74();
                _9(0, _0._43);
                _0._141 = (+new Date() - _0._26)
            }
            if (!_71(_0._62, _0._280)) {
                _0._280 = _0._62;
                _9(2, _0._62);
                if (_13.relativeMouseMove) {
                    var _267 = _7.elementFromPoint(_0._62.x, _0._62.y);
                    var _70 = _270(_267, _0._62.x, _0._62.y);
                    if (_70) _9(41, {
                        x: _70.x,
                        y: _70.y,
                        target: _24(_267)
                    })
                }
            }
            if (!_71(_0._42, _0._75)) {
                _0._75 = _0._42;
                _9(1, _0._42);
                _0._158 = (+new Date() - _0._26)
            }
        }

        function _115() {
            var _150 = _0._131 - _0._26;
            _0._10.unshift(_47.floor(_150 / 65536), _47.floor(_47.floor(_150 % 65536) / 256), (_150 % 65536) % 256, _47.floor(_0._10.length) / 256, _0._10.length % 256);
            _0._98.push(_200.e(_0._10) + "." + _250(_0._63) + "." + _250(_0._49));
            _0._10 = [];
            _0._49 = [];
            _0._63 = [];
            _0._131 = +new Date();
            _0._132 = _0._135 = 0;
            if (+new Date() - _0._26 > _41._339) {
                _6("Pageview over max.time, stopping.");
                _156();
                _1.clearInterval(_166);
                _1.clearInterval(_151);
                _1.clearTimeout(_90);
                _82 = false
            } else {
                _388()
            }
        }

        function _388() {
            if (_82 && _0._98.length > 0) {
                if (_0._76 == 1) {
                    _0._91++
                }
                for (var _5 = 0; _5 < _0._98.length; _5++) {
                    _73({
                        _37: _77 + "c.gif?w=" + _45 + "&s=" + _4._20 + "&p=" + _4._56 + "&q=" + _0._76 + "&li=" + _0._123 + "&lh=" + _0._108 + "&ls=" + _0._111 + "&d=" + _0._98[_5]
                    });
                    _0._76++;
                    _0._123 = _0._114;
                    _0._108 = _0._43.y;
                    _0._111 = _0._75.y
                }
                _0._98 = [];
                if (_0._76 > _41._404) _58()
            }
        }

        function _73(_14) {
            if (!_14 || !_14._37) return;
            _163();
            if (_228() && _1.XDomainRequest) {
                try {
                    _14._37 = _299(_14._37);
                    var _48 = new _1.XDomainRequest();
                    _48.open(_14._10 ? "POST" : "GET", _14._37);
                    _48.onload = function() {
                        if (_14._93) _14._93(_258(_48))
                    };
                    _48.onerror = function() {
                        if (_14._55) _14._55(_258(_48))
                    };
                    _48.onprogress = function() {
                        _6("XDR progress:" + _14._37)
                    };
                    _48.ontimeout = function() {
                        _6("XDR timeout:" + _14._37)
                    };
                    _48.timeout = 20000;
                    _1.setTimeout(function() {
                        _48.send(_14._10)
                    }, 500)
                } catch (_23) {
                    _6("Error in transmitCrossDomain (XDomainRequest): " + _23.message);
                    if (_14._55) _14._55({})
                }
            } else if (_1.XMLHttpRequest) {
                try {
                    var _35 = new _1.XMLHttpRequest();
                    _35.onreadystatechange = function() {
                        if (_35.readyState !== 4 || !_35.status) return;
                        if (_336(_35.status)) {
                            if (_14._93) _14._93(_254(_35))
                        } else {
                            if (_14._55) _14._55(_254(_35))
                        }
                    };
                    _35.open(_14._10 ? "POST" : "GET", _14._37, true);
                    _35.setRequestHeader("Content-type", "text/plain");
                    if (_14._389) _35.withCredentials = true;
                    if (_14._10, _14._273) _14._10 = pako.gzip(_14._10);
                    _35.send(_14._10)
                } catch (_23) {
                    _6("Error in transmitCrossDomain (XMLHttpRequest): " + _23.message);
                    if (_14._55) _14._55({})
                }
            }
        }

        function _258(_48) {
            return {
                _251: _48.responseText
            }
        }

        function _254(_35) {
            return {
                _146: _35.status,
                _251: _35.response
            }
        }

        function _148(_15, _10) {
            _73({
                _37: _77 + "data",
                _10: 'website=' + _45 + '&session=' + _4._20 + '&page=' + _4._56 + '&type=' + _15 + '&data=' + _50(_64(_10))
            })
        }

        function _336(_146) {
            return _146 >= 200 && _146 < 300
        }

        function _228() {
            return _7.all && !_1.atob;
        }

        function _346() {
            return document.all && !document.querySelector;
        }

        function _299(_37) {
            return _37.replace(/^https?:/i, _36.protocol)
        }

        function _282(_32, _291) {
            var _14 = {
                _37: _77 + 'b.gif' + '?website=' + _45 + '&session=' + _4._20 + '&page=' + _4._56,
                _10: 'encoding=' + _50(_303()) + '&zip=0' + '&size=' + _291 + '&html=' + _50('#DOM#' + _64(_32.data)),
                _273: _13.compress
            };
            var _69 = _262();
            _69.push(_14);
            _266(_69.slice(-10));
            _260()
        }

        function _260() {
            var _69 = _262();
            var _14 = _69.splice(0, 1)[0];
            if (_14) {
                _6("Sending initial DOM mutations. Size: " + _14._10.length);
                _14._93 = _14._55 = function() {
                    _266(_69);
                    _1.setTimeout(_260, 1)
                };
                _73(_14)
            }
        }

        function _262() {
            return JSON.parse(_1.sessionStorage.getItem('mf_initialDomQueue')) || []
        }

        function _266(_69) {
            _1.sessionStorage.setItem('mf_initialDomQueue', _64(_69))
        }

        function _303() {
            return _7.charset ? _7.charset : _7.characterSet
        }

        function _321(_32) {
            var _264 = _340(_32, _0._66);
            if (_264 > -1) {
                _0._66[_264].data = _32.data;
                _6("Deduplicating DOM mutation");
                return
            }
            if (_13.domReuse) {
                var _119 = _315(_32);
                var _249 = _331(_119);
                if (_249 > -1) {
                    _32.sequence = _249;
                    _6("Reusing already sent DOM mutation, sequence " + _32.sequence);
                    _9(38, {
                        x: _32.sequence,
                        y: 0
                    });
                    return
                } else _0._140.push(_119)
            }
            _32.sequence = ++_0._328;
            _9(38, {
                x: _32.sequence,
                y: 0
            });
            _0._66.push(_32);
            if (!_96) _96 = _1.setTimeout(_268, 1500)
        }

        function _331(_119) {
            for (var i = 0; i < _0._140.length; i++)
                if (_0._140[i] == _119) return i + 1;
            return -1
        }

        function _315(_32) {
            return _51(_64(_32.data))
        }

        function _268() {
            _96 = null;
            if (_82 && _0._66.length > 0) {
                var _248 = _0._66.length;
                var _10 = "";
                for (var i = 0; i < _248; i++) {
                    var _32 = _0._66[i];
                    _10 += (_10 !== "" ? "|||" : "") + _32.sequence + "." + _64(_32.data)
                }
                _0._66 = [];
                if (_10 != "") {
                    _10 = "website=" + _45 + "&session=" + _4._20 + "&page=" + _4._56 + "&data=" + _50(_10);
                    _73({
                        _37: _77 + "dom",
                        _10: _10,
                        _273: _13.compress
                    });
                    _6("Sending DOM mutations: " + _248 + ", size: " + _10.length)
                }
            }
        }

        function _340(_304, _275) {
            if (!_13.domDeduplicator) return -1;
            var _31 = _304.data.args;
            var _279 = _272(_31);
            var _274 = _278(_31);
            if (!_279 && !_274) return -1;
            for (var i = 0; i < _275.length; i++) {
                var _182 = _275[i].data.args;
                if (_279 && _272(_182) && _327(_31[2], _182[2])) {
                    return i
                } else if (_274 && _278(_182)) {
                    return i
                }
            }
            return -1
        }

        function _278(_31) {
            return _31[0].length === 0 && _31[1].length === 0 && _31[2].length > 0 && _31[3].length === 0 && _31[2].filter(_311).length === _31[2].length
        }

        function _311(_95) {
            return _95.attributes.d && _256(_95.attributes) === 1
        }

        function _272(_31) {
            return _31[0].length === 0 && _31[1].length === 0 && _31[2].length > 0 && _31[3].length === 0 && _31[2].filter(_317).length === _31[2].length
        }

        function _317(_95) {
            return _95.attributes.style && _256(_95.attributes) === 1
        }

        function _256(obj) {
            var count = 0;
            for (var prop in obj)
                if (obj.hasOwnProperty(prop)) count++;
            return count
        }

        function _327(_178, _259) {
            if (_178.length !== _259.length) return false;
            for (var i = 0; i < _178.length; i++) {
                var _288 = _178[i],
                    _326 = _259[i];
                if (_288.id !== _326.id) return false
            }
            return true
        }

        function _338() {
            if (_0._10.length > 0 && _277() >= 5000) {
                _9(19, {});
                _115()
            }
        }

        function _271() {
            _6("Inactivity timeout.");
            _58()
        }

        function _71(_46, _255) {
            return _46.x == _255.x && _46.y == _255.y
        }

        function _74() {
            var _17 = {
                x: typeof _1.innerWidth != "undefined" ? _1.innerWidth : _19(_1).width(),
                y: typeof _1.innerHeight != "undefined" ? _1.innerHeight : _19(_1).height()
            };
            if (_17.x == 0 && _17.y == 0) _17 = {
                x: _7.getElementsByTagName('body')[0].clientWidth,
                y: _7.getElementsByTagName('body')[0].clientHeight
            };
            return _17
        }

        function _398(_173) {
            if (!_173 || !_173.getBoundingClientRect) return null;
            var _122 = _173.getBoundingClientRect();
            var _57 = {
                x: _122.left,
                y: _122.top,
                width: _122.width,
                height: _122.height
            };
            if (_365(navigator.appVersion)) {
                _57.x -= _7.documentElement.clientLeft;
                _57.y -= _7.documentElement.clientTop
            }
            return _57
        }

        function _24(_3) {
            try {
                return _399(_3) || _269(_3)
            } catch (_23) {
                _6("Error in getElementPath: " + _23.message)
            }
            return ""
        }

        function _399(_3) {
            if (_3.attributes["name"] && _3.attributes["name"].value && _3.form != undefined && /button|input|select|textarea/.test(_3.tagName.toLowerCase())) {
                var _184 = _7.getElementsByName(_3.attributes["name"].value);
                if (_184.length > 1) {
                    for (var _5 = 0; _5 < _184.length; _5++)
                        if (_3 == _184[_5]) return _3.attributes["name"].value + "[" + _5 + "]_mf"
                } else return _3.attributes["name"].value
            }
            return null
        }

        function _269(_28) {
            var _22 = [];
            try {
                while (_28 && _28.nodeType == 1) {
                    var _16 = "";
                    if (_28.getAttribute('id') && !_372(_28, 'data-mf-ignore-child-ids')) {
                        _16 += '#' + _28.getAttribute('id');
                        _22.unshift(_16);
                        break
                    } else {
                        _16 += _28.nodeName.toLowerCase();
                        var _110 = '',
                            _181 = _28,
                            _180 = 1;
                        if (_28.parentNode && _28.parentNode.nodeName && _28.parentNode.nodeName.toLowerCase() == "body") {
                            var _265 = _393(_28);
                            _110 = _265.length ? '.' + _265.join('.') : ''
                        }
                        if (_110 != '' && _7.querySelectorAll && _7.querySelectorAll("body > " + _16 + _110).length == 1) _16 += _110;
                        else {
                            while (_181 = _181.previousElementSibling) {
                                if (_181.nodeName.toLowerCase() == _16) _180++
                            }
                            if (_180 != 1) _16 += ":[" + _180 + "]"
                        }
                    }
                    _22.unshift(_16);
                    if (!_28.parentNode) return "";
                    _28 = _28.parentNode
                }
            } catch (_23) {
                _6("Error in _269: " + _23.message)
            }
            return _22.join(" > ").replace("html > body > ", "> ")
        }

        function _393(_3) {
            var _263 = typeof _3.className === 'string' ? _371(_3.className.replace(/\s+/, ' ')) : '';
            return _263 !== '' ? _263.split(' ') : []
        }

        function _371(_8, _53) {
            if (_53 === undefined) _53 = ' ';
            var regex = new RegExp('^' + _53 + '|' + _53 + '$', 'g');
            return _8.replace(regex, '')
        }

        function _372(_28, _176) {
            return _28.parentNode && _28.parentNode.hasAttribute && _28.parentNode.hasAttribute(_176)
        }

        function _261(_67) {
            if (!_67) return null;
            var _3 = _347(_67);
            if (!_3) {
                try {
                    _3 = _7.querySelector(_349(_67))
                } catch (_23) {
                    _6("Error in _261: " + _23.message)
                }
            }
            return _3
        }

        function _347(_38) {
            if (!_38) return null;
            var _172 = _257.exec(_38);
            if (_172 && _172[1]) {
                try {
                    var _54 = _1.parseInt(_172[1]);
                    return _7.getElementsByName(_38.replace(_257, ""))[_54]
                } catch (_23) {}
            }
            var _87 = _7.getElementsByName(_38);
            if (_87 && _87.length == 1) return _87[0];
            return null
        }

        function _349(_22) {
            if (!_22) return null;
            if (_22.substr(0, 1) == '>') _22 = 'html > body ' + _22;
            _22 = _22.replace(/^#(\d)/, '#\\3$1 ');
            _22 = _22.replace(/^#(-\d)/, '#\\$1');
            _22 = _22.replace(/:([^\[])/g, '\\:$1');
            _22 = _22.replace(/^#[^\s]+/, function(id) {
                return '#' + id.slice(1).replace(/([^a-zA-Z\d\s:\\])/g, '\\$1')
            });
            _22 = _22.replace(/:\[([^\]]+)\]/g, ':nth-of-type($1)');
            return _22
        }

        function _175(_252, _253) {
            _253.push(_47.floor(_252 / 256));
            _253.push(_252 % 256)
        }

        function _250(_3) {
            var _17 = "";
            for (var _5 = 0; _5 < _3.length; _5++) {
                _17 += (_5 > 0 ? "," : "") + _198.encode('' + _3[_5])
            }
            return _17
        }

        function _126(_3) {
            var _129 = 0;
            for (var _5 = 0; _5 < _3.length; _5++) _129 += _198.encode('' + _3[_5]).length + 1;
            return _129 > 0 ? _129 - 1 : _129
        }

        function _133(_25) {
            if (_355(_25.hostname) || !_13.includeSubDomains) return _25.hostname;
            var _12 = _25.href;
            var _354 = /\.co\.|\.com\.|\.ac\.|\.org\.|\.gov\.|\.edu\.|\.net\./;
            _12 = _12.replace(/^http(s)?\:\/\/?/i, "").replace(/^([^\/]+)\/.*/i, "$1").replace(/:[\d]*$/, "");
            if (_354.test(_12)) _12 = _12.replace(/^([^\.]+\.){1,}([^\.]+\.[^\.]+\.[^\.]+)$/i, "$2");
            else _12 = _12.replace(/^([^\.]+\.){1,}([^\.]+\.[^\.]+)$/i, "$2");
            return "." + _12
        }

        function _355(ipaddress) {
            if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
                return (true)
            }
            return (false)
        }

        function _186(_38, _8, _358, _12) {
            var _247 = "";
            if (_358 == 1) {
                var _60 = new Date();
                _60.setTime(_60.getTime() + _41._380);
                _247 = "; expires=" + _60.toGMTString()
            }
            _7.cookie = _38 + "=" + _8 + _247 + "; path=/; domain=" + _12 + ";"
        }

        function _231(_38) {
            var _205 = _38 + "=";
            var _207 = _7.cookie.split(';');
            for (var i = 0; i < _207.length; i++) {
                var c = _207[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1)
                }
                if (c.indexOf(_205) == 0) {
                    return c.substring(_205.length, c.length)
                }
            }
            return ""
        }

        function _408(_364) {
            return _364.replace(/<!--[\s]*MouseflowExcludeStart[\s]*([\s\S]*?)-->([\s\S]*?)<!--[\s]*MouseflowExcludeEnd[\s]*-->/g, "$1")
        }

        function _365(_177) {
            return /msie/i.test(_177)
        }

        function _407(_177) {
            return /msie 5|msie 6|msie 7/i.test(_177)
        }
        var _200 = new function() {
            for (var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), c = 64; c;) --c;
            this.e = function(e) {
                for (var a = [], f = 0, b = 0, g, c = e.length, h = c % 3; f < c;) a[b++] = d[(g = e[f++] << 16 | e[f++] << 8 | e[f++]) >> 18 & 63] + d[g >> 12 & 63] + d[g >> 6 & 63] + d[g & 63];
                if (h)
                    for (a[--b] = a[b].substr(0, a[b].length - (h = 3 - h)); h--;) a[b] += "*";
                return a.join("")
            }
        };
        var _198 = {
            _118: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function(c) {
                for (var a = "", d, b, e, i, h, f, g = 0, c = this._350(c); g < c.length;) d = c.charCodeAt(g++), b = c.charCodeAt(g++), e = c.charCodeAt(g++), i = d >> 2, d = (d & 3) << 4 | b >> 4, h = (b & 15) << 2 | e >> 6, f = e & 63, isNaN(b) ? h = f = 64 : isNaN(e) && (f = 64), a = a + this._118.charAt(i) + this._118.charAt(d) + this._118.charAt(h) + this._118.charAt(f);
                return a
            },
            _350: function(c) {
                for (var c = c.replace(/\r\n/g, "\n"), a = "", d = 0; d < c.length; d++) {
                    var b = c.charCodeAt(d);
                    128 > b ? a += String.fromCharCode(b) : (127 < b && 2048 > b ? a += String.fromCharCode(b >> 6 | 192) : (a += String.fromCharCode(b >> 12 | 224), a += String.fromCharCode(b >> 6 & 63 | 128)), a += String.fromCharCode(b & 63 | 128))
                }
                return a
            }
        };

        function _174() {
            var _46 = function() {
                return ((1 + _47.random()) * 65536 | 0).toString(16).substring(1)
            };
            return _46() + _46() + _46() + _46() + _46() + _46() + _46() + _46()
        }

        function _194(_344) {
            _6("Initing recorder");
            if (_346()) {
                _6("Recording not started - browser is IE7 or older");
                return
            }
            _19 = _344;
            _19(_7).ready(function() {
                if (!_121 && _13.autoStart) {
                    _121 = true;
                    _78()
                }
            });
            if (_7.readyState != "complete") {
                _19(_1).on('load.mouseflow', function() {
                    _9(14, {
                        x: 0,
                        y: _19(_7).height()
                    });
                    if (!_121 && _13.autoStart) {
                        _6("DOM-ready handler not executed, starting with onload handler");
                        _121 = true;
                        _78()
                    }
                })
            } else {
                _6("Onload was already fired, adding event directly.");
                _9(14, {
                    x: 0,
                    y: _19(_7).height()
                })
            }
        }(function() {
            if (typeof mouseflowPlayback == "undefined") {
                var _179 = false;
                if (typeof(jQuery) != "undefined" && _192(jQuery.fn.jquery, '1.7.0') && jQuery.fn.jquery != '1.8.1') {
                    _6("New jQuery found, version: " + jQuery.fn.jquery);
                    _4._170 = "1";
                    _179 = true
                } else if (typeof(jQuery) != "undefined") {
                    _6("Old jQuery found, version: " + jQuery.fn.jquery + ", adding new one.");
                    _4._170 = "1"
                } else {
                    _6("jQuery not found, adding")
                }
                if (_36.search.indexOf('mf_jquery=1') > -1) _179 = false;
                if (_179) _194(jQuery);
                else {
                    var _189 = false;
                    var _396 = _7.getElementsByTagName("head")[0];
                    var _105 = _7.createElement("script");
                    _105.type = "text/javascript";
                    _105.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js?ref=mouseflow";
                    _105.onload = _105.onreadystatechange = function() {
                        if (!_189 && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            _189 = true;
                            var _395 = jQuery.noConflict(true);
                            _194(_395)
                        }
                    };
                    _396.appendChild(_105)
                }
            }
        })();

        function _397() {
            return _13.useUnload ? "unload" : "beforeunload"
        }

        function _192(_402, _403) {
            var _81 = _210(_402);
            var _25 = _210(_403);
            var _109 = _47.max(_81.length, _25.length);
            if (_25 == 'NaN' || _81 == 'NaN') {
                return false
            }
            for (var i = 0; i < _109; i++) {
                _81[i] = _81[i] || 0;
                _25[i] = _25[i] || 0;
                if (_81[i] == _25[i]) {
                    continue
                }
                return _81[i] > _25[i]
            }
            return true
        }

        function _210(_390) {
            var _234 = _390.split('.');
            var _235 = [];
            for (var i = 0; i < _234.length; i++) {
                _235.push(parseInt(_234[i]))
            }
            return _235
        }

        function _92(_237, _238) {
            return _237.indexOf(_238, _237.length - _238.length) !== -1
        }

        function _51(_25) {
            var _128 = 0,
                _239;
            for (var _5 = 0; _5 < _25.length; _5++) {
                _239 = _25.charCodeAt(_5);
                _128 = ((_128 << 5) - _128) + _239
            }
            return _128.toString()
        }

        function _284(_34) {
            for (var _5 = 0; _5 < _0._52.length; _5++)
                if (_0._52[_5].split("_")[0] == _51(_34)) {
                    return _5
                }
            return -1
        }

        function _294(_12) {
            var _298 = _12;
            _12 = _171(_12);
            var _240 = false;
            for (var _5 = 0; _5 < _88.length; _5++) {
                if (_12 == _171(_88[_5])) {
                    _240 = true;
                    break
                }
            }
            _12 = _289(_12);
            var _241 = false;
            for (var _5 = 0; _5 < _88.length; _5++) {
                if (_12 == _171(_88[_5])) {
                    _241 = true;
                    break
                }
            }
            var _17 = _240 || _241;
            if (!_17) _6("Domain was blocked: " + _298 + " - domain list: " + _88);
            return _17
        }

        function _171(_12) {
            if (_12 == null) return "";
            _12 = _12.toLowerCase();
            _12 = _12.replace(/^\s+|\s+$/g, '');
            if (_12.substring(0, 4) == "www.") {
                _12 = _12.substring(4, _12.length)
            }
            return _12
        }

        function _289(_12) {
            if (_13.includeSubDomains) {
                _12 = _300(_12)
            }
            return _12
        }

        function _300(_12) {
            var _44 = _12.split('.');
            if (_44.length <= 2) return _12;
            if (_12.indexOf(".co.") > -1 || _12.indexOf(".com.") > -1 || _12.indexOf(".org.") > -1) {
                _44 = _44.slice(_44.length - 3, _44.length);
                return _44.join(".")
            }
            _44 = _44.slice(_44.length - 2, _44.length);
            return _44.join(".")
        }

        function _287() {
            var _17 = [];
            if (typeof Ember != "undefined") _17.push("em");
            if (typeof angular != "undefined") _17.push("an");
            if (typeof Backbone != "undefined") _17.push("bb");
            return _17
        }

        function _281() {
            if (_13.autoTagging) {
                _6("Autotagging session");
                var _245 = ['utm_source', 'utm_medium', 'utm_term', 'utm_content', 'utm_campaign', 'gclid'];
                for (var _5 = 0; _5 < _245.length; _5++) {
                    var _230 = _245[_5];
                    var _8 = _297(_230);
                    if (_8) _220(_230, _8, 'session', true)
                }
            }
        }

        function _297(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search.toLowerCase());
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
        }

        function _6(_229) {
            if (_13.debug) console.log("MF" + (_13.includeDebugTime ? " - " + (+new Date() - _0._26) : "") + ": " + _229)
        }
        if (!_228()) {
            var pako = function() {
                function t() {
                    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
                }

                function e(t, e, a, n) {
                    for (var r = 65535 & t | 0, i = t >>> 16 & 65535 | 0, s = 0; 0 !== a;) {
                        s = a > 2e3 ? 2e3 : a, a -= s;
                        do r = r + e[n++] | 0, i = i + r | 0; while (--s);
                        r %= 65521, i %= 65521
                    }
                    return r | i << 16 | 0
                }
                var a = {
                        2: "need dictionary",
                        1: "stream end",
                        0: "",
                        "-1": "file error",
                        "-2": "stream error",
                        "-3": "data error",
                        "-4": "insufficient memory",
                        "-5": "buffer error",
                        "-6": "incompatible version"
                    },
                    n = function() {
                        function t() {
                            for (var t, e = [], a = 0; a < 256; a++) {
                                t = a;
                                for (var n = 0; n < 8; n++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                                e[a] = t
                            }
                            return e
                        }

                        function e(t, e, n, r) {
                            var i = a,
                                s = r + n;
                            t ^= -1;
                            for (var h = r; h < s; h++) t = t >>> 8 ^ i[255 & (t ^ e[h])];
                            return t ^ -1
                        }
                        var a = t();
                        return e
                    }(),
                    r = {
                        Buf8: Uint8Array,
                        Buf16: Uint16Array,
                        assign: function(t) {
                            for (var e = Array.prototype.slice.call(arguments, 1); e.length;) {
                                var a = e.shift();
                                if (a) {
                                    if ("object" != typeof a) throw new TypeError(a + "must be non-object");
                                    for (var n in a) a.hasOwnProperty(n) && (t[n] = a[n])
                                }
                            }
                            return t
                        },
                        shrinkBuf: function(t, e) {
                            return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t)
                        },
                        arraySet: function(t, e, a, n, r) {
                            if (e.subarray && t.subarray) return void t.set(e.subarray(a, a + n), r);
                            for (var i = 0; i < n; i++) t[r + i] = e[a + i]
                        },
                        flattenChunks: function(t) {
                            var e, a, n, r, i, s;
                            for (n = 0, e = 0, a = t.length; e < a; e++) n += t[e].length;
                            for (s = new Uint8Array(n), r = 0, e = 0, a = t.length; e < a; e++) i = t[e], s.set(i, r), r += i.length;
                            return s
                        }
                    },
                    i = function() {
                        function t(t) {
                            var e, a, n, i, s, h = t.length,
                                _ = 0;
                            for (i = 0; i < h; i++) a = t.charCodeAt(i), 55296 === (64512 & a) && i + 1 < h && (n = t.charCodeAt(i + 1), 56320 === (64512 & n) && (a = 65536 + (a - 55296 << 10) + (n - 56320), i++)), _ += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;
                            for (e = new r.Buf8(_), s = 0, i = 0; s < _; i++) a = t.charCodeAt(i), 55296 === (64512 & a) && i + 1 < h && (n = t.charCodeAt(i + 1), 56320 === (64512 & n) && (a = 65536 + (a - 55296 << 10) + (n - 56320), i++)), a < 128 ? e[s++] = a : a < 2048 ? (e[s++] = 192 | a >>> 6, e[s++] = 128 | 63 & a) : a < 65536 ? (e[s++] = 224 | a >>> 12, e[s++] = 128 | a >>> 6 & 63, e[s++] = 128 | 63 & a) : (e[s++] = 240 | a >>> 18, e[s++] = 128 | a >>> 12 & 63, e[s++] = 128 | a >>> 6 & 63, e[s++] = 128 | 63 & a);
                            return e
                        }

                        function e(t) {
                            var e = t.length;
                            if (e < 65537 && (t.subarray && n || !t.subarray && a)) return String.fromCharCode.apply(null, r.shrinkBuf(t, e));
                            for (var i = "", s = 0; s < e; s++) i += String.fromCharCode(t[s]);
                            return i
                        }
                        var a = !0,
                            n = !0;
                        try {
                            String.fromCharCode.apply(null, [0])
                        } catch (t) {
                            a = !1
                        }
                        try {
                            String.fromCharCode.apply(null, new Uint8Array(1))
                        } catch (t) {
                            n = !1
                        }
                        return {
                            string2buf: t,
                            buf2binstring: e
                        }
                    }(),
                    s = function() {
                        function t(t) {
                            for (var e = t.length; --e >= 0;) t[e] = 0
                        }

                        function e(t, e, a, n, r) {
                            this.static_tree = t, this.extra_bits = e, this.extra_base = a, this.elems = n, this.max_length = r, this.has_stree = t && t.length
                        }

                        function a(t, e) {
                            this.dyn_tree = t, this.max_code = 0, this.stat_desc = e
                        }

                        function n(t) {
                            return t < 256 ? it[t] : it[256 + (t >>> 7)]
                        }

                        function i(t, e) {
                            t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255
                        }

                        function s(t, e, a) {
                            t.bi_valid > Q - a ? (t.bi_buf |= e << t.bi_valid & 65535, i(t, t.bi_buf), t.bi_buf = e >> Q - t.bi_valid, t.bi_valid += a - Q) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += a)
                        }

                        function h(t, e, a) {
                            s(t, a[2 * e], a[2 * e + 1])
                        }

                        function _(t, e) {
                            var a = 0;
                            do a |= 1 & t, t >>>= 1, a <<= 1; while (--e > 0);
                            return a >>> 1
                        }

                        function l(t) {
                            16 === t.bi_valid ? (i(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8)
                        }

                        function o(t, e) {
                            var a, n, r, i, s, h, _ = e.dyn_tree,
                                l = e.max_code,
                                o = e.stat_desc.static_tree,
                                d = e.stat_desc.has_stree,
                                u = e.stat_desc.extra_bits,
                                f = e.stat_desc.extra_base,
                                c = e.stat_desc.max_length,
                                g = 0;
                            for (i = 0; i <= N; i++) t.bl_count[i] = 0;
                            for (_[2 * t.heap[t.heap_max] + 1] = 0, a = t.heap_max + 1; a < M; a++) n = t.heap[a], i = _[2 * _[2 * n + 1] + 1] + 1, i > c && (i = c, g++), _[2 * n + 1] = i, n > l || (t.bl_count[i]++, s = 0, n >= f && (s = u[n - f]), h = _[2 * n], t.opt_len += h * (i + s), d && (t.static_len += h * (o[2 * n + 1] + s)));
                            if (0 !== g) {
                                do {
                                    for (i = c - 1; 0 === t.bl_count[i];) i--;
                                    t.bl_count[i]--, t.bl_count[i + 1] += 2, t.bl_count[c]--, g -= 2
                                } while (g > 0);
                                for (i = c; 0 !== i; i--)
                                    for (n = t.bl_count[i]; 0 !== n;) r = t.heap[--a], r > l || (_[2 * r + 1] !== i && (t.opt_len += (i - _[2 * r + 1]) * _[2 * r], _[2 * r + 1] = i), n--)
                            }
                        }

                        function d(t, e, a) {
                            var n, r, i = new Array(N + 1),
                                s = 0;
                            for (n = 1; n <= N; n++) i[n] = s = s + a[n - 1] << 1;
                            for (r = 0; r <= e; r++) {
                                var h = t[2 * r + 1];
                                0 !== h && (t[2 * r] = _(i[h]++, h))
                            }
                        }

                        function u() {
                            var t, a, n, r, i, s = new Array(N + 1);
                            for (n = 0, r = 0; r < q - 1; r++)
                                for (ht[r] = n, t = 0; t < 1 << Z[r]; t++) st[n++] = r;
                            for (st[n - 1] = r, i = 0, r = 0; r < 16; r++)
                                for (_t[r] = i, t = 0; t < 1 << $[r]; t++) it[i++] = r;
                            for (i >>= 7; r < J; r++)
                                for (_t[r] = i << 7, t = 0; t < 1 << $[r] - 7; t++) it[256 + i++] = r;
                            for (a = 0; a <= N; a++) s[a] = 0;
                            for (t = 0; t <= 143;) nt[2 * t + 1] = 8, t++, s[8]++;
                            for (; t <= 255;) nt[2 * t + 1] = 9, t++, s[9]++;
                            for (; t <= 279;) nt[2 * t + 1] = 7, t++, s[7]++;
                            for (; t <= 287;) nt[2 * t + 1] = 8, t++, s[8]++;
                            for (d(nt, G + 1, s), t = 0; t < J; t++) rt[2 * t + 1] = 5, rt[2 * t] = _(t, 5);
                            lt = new e(nt, Z, F + 1, G, N), ot = new e(rt, $, 0, J, N), dt = new e(new Array(0), tt, 0, K, R)
                        }

                        function f(t) {
                            var e;
                            for (e = 0; e < G; e++) t.dyn_ltree[2 * e] = 0;
                            for (e = 0; e < J; e++) t.dyn_dtree[2 * e] = 0;
                            for (e = 0; e < K; e++) t.bl_tree[2 * e] = 0;
                            t.dyn_ltree[2 * V] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0
                        }

                        function c(t) {
                            t.bi_valid > 8 ? i(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0
                        }

                        function g(t, e, a, n) {
                            c(t), n && (i(t, a), i(t, ~a)), r.arraySet(t.pending_buf, t.window, e, a, t.pending), t.pending += a
                        }

                        function p(t, e, a, n) {
                            var r = 2 * e,
                                i = 2 * a;
                            return t[r] < t[i] || t[r] === t[i] && n[e] <= n[a]
                        }

                        function b(t, e, a) {
                            for (var n = t.heap[a], r = a << 1; r <= t.heap_len && (r < t.heap_len && p(e, t.heap[r + 1], t.heap[r], t.depth) && r++, !p(e, n, t.heap[r], t.depth));) t.heap[a] = t.heap[r], a = r, r <<= 1;
                            t.heap[a] = n
                        }

                        function w(t, e, a) {
                            var r, i, _, l, o = 0;
                            if (0 !== t.last_lit)
                                do r = t.pending_buf[t.d_buf + 2 * o] << 8 | t.pending_buf[t.d_buf + 2 * o + 1], i = t.pending_buf[t.l_buf + o], o++, 0 === r ? h(t, i, e) : (_ = st[i], h(t, _ + F + 1, e), l = Z[_], 0 !== l && (i -= ht[_], s(t, i, l)), r--, _ = n(r), h(t, _, a), l = $[_], 0 !== l && (r -= _t[_], s(t, r, l))); while (o < t.last_lit);
                            h(t, V, e)
                        }

                        function v(t, e) {
                            var a, n, r, i = e.dyn_tree,
                                s = e.stat_desc.static_tree,
                                h = e.stat_desc.has_stree,
                                _ = e.stat_desc.elems,
                                l = -1;
                            for (t.heap_len = 0, t.heap_max = M, a = 0; a < _; a++) 0 !== i[2 * a] ? (t.heap[++t.heap_len] = l = a, t.depth[a] = 0) : i[2 * a + 1] = 0;
                            for (; t.heap_len < 2;) r = t.heap[++t.heap_len] = l < 2 ? ++l : 0, i[2 * r] = 1, t.depth[r] = 0, t.opt_len--, h && (t.static_len -= s[2 * r + 1]);
                            for (e.max_code = l, a = t.heap_len >> 1; a >= 1; a--) b(t, i, a);
                            r = _;
                            do a = t.heap[1], t.heap[1] = t.heap[t.heap_len--], b(t, i, 1), n = t.heap[1], t.heap[--t.heap_max] = a, t.heap[--t.heap_max] = n, i[2 * r] = i[2 * a] + i[2 * n], t.depth[r] = (t.depth[a] >= t.depth[n] ? t.depth[a] : t.depth[n]) + 1, i[2 * a + 1] = i[2 * n + 1] = r, t.heap[1] = r++, b(t, i, 1); while (t.heap_len >= 2);
                            t.heap[--t.heap_max] = t.heap[1], o(t, e), d(i, l, t.bl_count)
                        }

                        function m(t, e, a) {
                            var n, r, i = -1,
                                s = e[1],
                                h = 0,
                                _ = 7,
                                l = 4;
                            for (0 === s && (_ = 138, l = 3), e[2 * (a + 1) + 1] = 65535, n = 0; n <= a; n++) r = s, s = e[2 * (n + 1) + 1], ++h < _ && r === s || (h < l ? t.bl_tree[2 * r] += h : 0 !== r ? (r !== i && t.bl_tree[2 * r]++, t.bl_tree[2 * W]++) : h <= 10 ? t.bl_tree[2 * X]++ : t.bl_tree[2 * Y]++, h = 0, i = r, 0 === s ? (_ = 138, l = 3) : r === s ? (_ = 6, l = 3) : (_ = 7, l = 4))
                        }

                        function k(t, e, a) {
                            var n, r, i = -1,
                                _ = e[1],
                                l = 0,
                                o = 7,
                                d = 4;
                            for (0 === _ && (o = 138, d = 3), n = 0; n <= a; n++)
                                if (r = _, _ = e[2 * (n + 1) + 1], !(++l < o && r === _)) {
                                    if (l < d) {
                                        do h(t, r, t.bl_tree); while (0 !== --l)
                                    } else 0 !== r ? (r !== i && (h(t, r, t.bl_tree), l--), h(t, W, t.bl_tree), s(t, l - 3, 2)) : l <= 10 ? (h(t, X, t.bl_tree), s(t, l - 3, 3)) : (h(t, Y, t.bl_tree), s(t, l - 11, 7));
                                    l = 0, i = r, 0 === _ ? (o = 138, d = 3) : r === _ ? (o = 6, d = 3) : (o = 7, d = 4)
                                }
                        }

                        function y(t) {
                            var e;
                            for (m(t, t.dyn_ltree, t.l_desc.max_code), m(t, t.dyn_dtree, t.d_desc.max_code), v(t, t.bl_desc), e = K - 1; e >= 3 && 0 === t.bl_tree[2 * et[e] + 1]; e--);
                            return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e
                        }

                        function z(t, e, a, n) {
                            var r;
                            for (s(t, e - 257, 5), s(t, a - 1, 5), s(t, n - 4, 4), r = 0; r < n; r++) s(t, t.bl_tree[2 * et[r] + 1], 3);
                            k(t, t.dyn_ltree, e - 1), k(t, t.dyn_dtree, a - 1)
                        }

                        function x(t) {
                            var e, a = 4093624447;
                            for (e = 0; e <= 31; e++, a >>>= 1)
                                if (1 & a && 0 !== t.dyn_ltree[2 * e]) return U;
                            if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return D;
                            for (e = 32; e < F; e++)
                                if (0 !== t.dyn_ltree[2 * e]) return D;
                            return U
                        }

                        function B(t) {
                            ut || (u(), ut = !0), t.l_desc = new a(t.dyn_ltree, lt), t.d_desc = new a(t.dyn_dtree, ot), t.bl_desc = new a(t.bl_tree, dt), t.bi_buf = 0, t.bi_valid = 0, f(t)
                        }

                        function A(t, e, a, n) {
                            s(t, (I << 1) + (n ? 1 : 0), 3), g(t, e, a, !0)
                        }

                        function S(t) {
                            s(t, L << 1, 3), h(t, V, nt), l(t)
                        }

                        function C(t, e, a, n) {
                            var r, i, h = 0;
                            t.level > 0 ? (t.strm.data_type === H && (t.strm.data_type = x(t)), v(t, t.l_desc), v(t, t.d_desc), h = y(t), r = t.opt_len + 3 + 7 >>> 3, i = t.static_len + 3 + 7 >>> 3, i <= r && (r = i)) : r = i = a + 5, a + 4 <= r && e !== -1 ? A(t, e, a, n) : t.strategy === j || i === r ? (s(t, (L << 1) + (n ? 1 : 0), 3), w(t, nt, rt)) : (s(t, (O << 1) + (n ? 1 : 0), 3), z(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, h + 1), w(t, t.dyn_ltree, t.dyn_dtree)), f(t), n && c(t)
                        }

                        function E(t, e, a) {
                            return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & a, t.last_lit++, 0 === e ? t.dyn_ltree[2 * a]++ : (t.matches++, e--, t.dyn_ltree[2 * (st[a] + F + 1)]++, t.dyn_dtree[2 * n(e)]++), t.last_lit === t.lit_bufsize - 1
                        }
                        var j = 4,
                            U = 0,
                            D = 1,
                            H = 2,
                            I = 0,
                            L = 1,
                            O = 2,
                            P = 3,
                            T = 258,
                            q = 29,
                            F = 256,
                            G = F + 1 + q,
                            J = 30,
                            K = 19,
                            M = 2 * G + 1,
                            N = 15,
                            Q = 16,
                            R = 7,
                            V = 256,
                            W = 16,
                            X = 17,
                            Y = 18,
                            Z = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                            $ = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                            tt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                            et = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                            at = 512,
                            nt = new Array(2 * (G + 2));
                        t(nt);
                        var rt = new Array(2 * J);
                        t(rt);
                        var it = new Array(at);
                        t(it);
                        var st = new Array(T - P + 1);
                        t(st);
                        var ht = new Array(q);
                        t(ht);
                        var _t = new Array(J);
                        t(_t);
                        var lt, ot, dt, ut = !1;
                        return {
                            _tr_init: B,
                            _tr_stored_block: A,
                            _tr_align: S,
                            _tr_flush_block: C,
                            _tr_tally: E
                        }
                    }(),
                    h = function() {
                        function t(t, e) {
                            return t.msg = a[e], e
                        }

                        function i(t) {
                            return (t << 1) - (t > 4 ? 9 : 0)
                        }

                        function h(t) {
                            for (var e = t.length; --e >= 0;) t[e] = 0
                        }

                        function _(t) {
                            var e = t.state,
                                a = e.pending;
                            a > t.avail_out && (a = t.avail_out), 0 !== a && (r.arraySet(t.output, e.pending_buf, e.pending_out, a, t.next_out), t.next_out += a, e.pending_out += a, t.total_out += a, t.avail_out -= a, e.pending -= a, 0 === e.pending && (e.pending_out = 0))
                        }

                        function l(t, e) {
                            s._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, _(t.strm)
                        }

                        function o(t, e) {
                            t.pending_buf[t.pending++] = e
                        }

                        function d(t, e) {
                            t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e
                        }

                        function u(t, a, i, s) {
                            var h = t.avail_in;
                            return h > s && (h = s), 0 === h ? 0 : (t.avail_in -= h, r.arraySet(a, t.input, t.next_in, h, i), 1 === t.state.wrap ? t.adler = e(t.adler, a, h, i) : 2 === t.state.wrap && (t.adler = n(t.adler, a, h, i)), t.next_in += h, t.total_in += h, h)
                        }

                        function f(t, e) {
                            var a, n, r = t.max_chain_length,
                                i = t.strstart,
                                s = t.prev_length,
                                h = t.nice_match,
                                _ = t.strstart > t.w_size - rt ? t.strstart - (t.w_size - rt) : 0,
                                l = t.window,
                                o = t.w_mask,
                                d = t.prev,
                                u = t.strstart + nt,
                                f = l[i + s - 1],
                                c = l[i + s];
                            t.prev_length >= t.good_match && (r >>= 2), h > t.lookahead && (h = t.lookahead);
                            do
                                if (a = e, l[a + s] === c && l[a + s - 1] === f && l[a] === l[i] && l[++a] === l[i + 1]) {
                                    i += 2, a++;
                                    do; while (l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && i < u);
                                    if (n = nt - (u - i), i = u - nt, n > s) {
                                        if (t.match_start = e, s = n, n >= h) break;
                                        f = l[i + s - 1], c = l[i + s]
                                    }
                                }
                            while ((e = d[e & o]) > _ && 0 !== --r);
                            return s <= t.lookahead ? s : t.lookahead
                        }

                        function c(t) {
                            var e, a, n, i, s, h = t.w_size;
                            do {
                                if (i = t.window_size - t.lookahead - t.strstart, t.strstart >= h + (h - rt)) {
                                    r.arraySet(t.window, t.window, h, h, 0), t.match_start -= h, t.strstart -= h, t.block_start -= h, a = t.hash_size, e = a;
                                    do n = t.head[--e], t.head[e] = n >= h ? n - h : 0; while (--a);
                                    a = h, e = a;
                                    do n = t.prev[--e], t.prev[e] = n >= h ? n - h : 0; while (--a);
                                    i += h
                                }
                                if (0 === t.strm.avail_in) break;
                                if (a = u(t.strm, t.window, t.strstart + t.lookahead, i), t.lookahead += a, t.lookahead + t.insert >= at)
                                    for (s = t.strstart - t.insert, t.ins_h = t.window[s], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[s + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[s + at - 1]) & t.hash_mask, t.prev[s & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = s, s++, t.insert--, !(t.lookahead + t.insert < at)););
                            } while (t.lookahead < rt && 0 !== t.strm.avail_in)
                        }

                        function g(t, e) {
                            var a = 65535;
                            for (a > t.pending_buf_size - 5 && (a = t.pending_buf_size - 5);;) {
                                if (t.lookahead <= 1) {
                                    if (c(t), 0 === t.lookahead && e === U) return ft;
                                    if (0 === t.lookahead) break
                                }
                                t.strstart += t.lookahead, t.lookahead = 0;
                                var n = t.block_start + a;
                                if ((0 === t.strstart || t.strstart >= n) && (t.lookahead = t.strstart - n, t.strstart = n, l(t, !1), 0 === t.strm.avail_out)) return ft;
                                if (t.strstart - t.block_start >= t.w_size - rt && (l(t, !1), 0 === t.strm.avail_out)) return ft
                            }
                            return t.insert = 0, e === I ? (l(t, !0), 0 === t.strm.avail_out ? gt : pt) : t.strstart > t.block_start && (l(t, !1), 0 === t.strm.avail_out) ? ft : ft
                        }

                        function p(t, e) {
                            for (var a, n;;) {
                                if (t.lookahead < rt) {
                                    if (c(t), t.lookahead < rt && e === U) return ft;
                                    if (0 === t.lookahead) break
                                }
                                if (a = 0, t.lookahead >= at && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + at - 1]) & t.hash_mask, a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== a && t.strstart - a <= t.w_size - rt && (t.match_length = f(t, a)), t.match_length >= at)
                                    if (n = s._tr_tally(t, t.strstart - t.match_start, t.match_length - at), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= at) {
                                        t.match_length--;
                                        do t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + at - 1]) & t.hash_mask, a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart; while (0 !== --t.match_length);
                                        t.strstart++
                                    } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
                                else n = s._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
                                if (n && (l(t, !1), 0 === t.strm.avail_out)) return ft
                            }
                            return t.insert = t.strstart < at - 1 ? t.strstart : at - 1, e === I ? (l(t, !0), 0 === t.strm.avail_out ? gt : pt) : t.last_lit && (l(t, !1), 0 === t.strm.avail_out) ? ft : ct
                        }

                        function b(t, e) {
                            for (var a, n, r;;) {
                                if (t.lookahead < rt) {
                                    if (c(t), t.lookahead < rt && e === U) return ft;
                                    if (0 === t.lookahead) break
                                }
                                if (a = 0, t.lookahead >= at && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + at - 1]) & t.hash_mask, a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = at - 1, 0 !== a && t.prev_length < t.max_lazy_match && t.strstart - a <= t.w_size - rt && (t.match_length = f(t, a), t.match_length <= 5 && (t.strategy === J || t.match_length === at && t.strstart - t.match_start > 4096) && (t.match_length = at - 1)), t.prev_length >= at && t.match_length <= t.prev_length) {
                                    r = t.strstart + t.lookahead - at, n = s._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - at), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
                                    do ++t.strstart <= r && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + at - 1]) & t.hash_mask, a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart); while (0 !== --t.prev_length);
                                    if (t.match_available = 0, t.match_length = at - 1, t.strstart++, n && (l(t, !1), 0 === t.strm.avail_out)) return ft
                                } else if (t.match_available) {
                                    if (n = s._tr_tally(t, 0, t.window[t.strstart - 1]), n && l(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return ft
                                } else t.match_available = 1, t.strstart++, t.lookahead--
                            }
                            return t.match_available && (n = s._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < at - 1 ? t.strstart : at - 1, e === I ? (l(t, !0), 0 === t.strm.avail_out ? gt : pt) : t.last_lit && (l(t, !1), 0 === t.strm.avail_out) ? ft : ct
                        }

                        function w(t, e) {
                            for (var a, n, r, i, h = t.window;;) {
                                if (t.lookahead <= nt) {
                                    if (c(t), t.lookahead <= nt && e === U) return ft;
                                    if (0 === t.lookahead) break
                                }
                                if (t.match_length = 0, t.lookahead >= at && t.strstart > 0 && (r = t.strstart - 1, n = h[r], n === h[++r] && n === h[++r] && n === h[++r])) {
                                    i = t.strstart + nt;
                                    do; while (n === h[++r] && n === h[++r] && n === h[++r] && n === h[++r] && n === h[++r] && n === h[++r] && n === h[++r] && n === h[++r] && r < i);
                                    t.match_length = nt - (i - r), t.match_length > t.lookahead && (t.match_length = t.lookahead)
                                }
                                if (t.match_length >= at ? (a = s._tr_tally(t, 1, t.match_length - at), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (a = s._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), a && (l(t, !1), 0 === t.strm.avail_out)) return ft
                            }
                            return t.insert = 0, e === I ? (l(t, !0), 0 === t.strm.avail_out ? gt : pt) : t.last_lit && (l(t, !1), 0 === t.strm.avail_out) ? ft : ct
                        }

                        function v(t, e) {
                            for (var a;;) {
                                if (0 === t.lookahead && (c(t), 0 === t.lookahead)) {
                                    if (e === U) return ft;
                                    break
                                }
                                if (t.match_length = 0, a = s._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, a && (l(t, !1), 0 === t.strm.avail_out)) return ft
                            }
                            return t.insert = 0, e === I ? (l(t, !0), 0 === t.strm.avail_out ? gt : pt) : t.last_lit && (l(t, !1), 0 === t.strm.avail_out) ? ft : ct
                        }

                        function m(t, e, a, n, r) {
                            this.good_length = t, this.max_lazy = e, this.nice_length = a, this.max_chain = n, this.func = r
                        }

                        function k(t) {
                            t.window_size = 2 * t.w_size, h(t.head), t.max_lazy_match = j[t.level].max_lazy, t.good_match = j[t.level].good_length, t.nice_match = j[t.level].nice_length, t.max_chain_length = j[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = at - 1, t.match_available = 0, t.ins_h = 0
                        }

                        function y() {
                            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = R, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new r.Buf16(2 * tt), this.dyn_dtree = new r.Buf16(2 * (2 * Z + 1)), this.bl_tree = new r.Buf16(2 * (2 * $ + 1)), h(this.dyn_ltree), h(this.dyn_dtree), h(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new r.Buf16(et + 1), this.heap = new r.Buf16(2 * Y + 1), h(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new r.Buf16(2 * Y + 1), h(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
                        }

                        function z(e) {
                            var a;
                            return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = Q, a = e.state, a.pending = 0, a.pending_out = 0, a.wrap < 0 && (a.wrap = -a.wrap), a.status = a.wrap ? st : dt, e.adler = 2 === a.wrap ? 0 : 1, a.last_flush = U, s._tr_init(a), O) : t(e, T)
                        }

                        function x(t) {
                            var e = z(t);
                            return e === O && k(t.state), e
                        }

                        function B(t, e) {
                            return t && t.state ? 2 !== t.state.wrap ? T : (t.state.gzhead = e, O) : T
                        }

                        function A(e, a, n, i, s, h) {
                            if (!e) return T;
                            var _ = 1;
                            if (a === G && (a = 6), i < 0 ? (_ = 0, i = -i) : i > 15 && (_ = 2, i -= 16), s < 1 || s > V || n !== R || i < 8 || i > 15 || a < 0 || a > 9 || h < 0 || h > N) return t(e, T);
                            8 === i && (i = 9);
                            var l = new y;
                            return e.state = l, l.strm = e, l.wrap = _, l.gzhead = null, l.w_bits = i, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = s + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + at - 1) / at), l.window = new r.Buf8(2 * l.w_size), l.head = new r.Buf16(l.hash_size), l.prev = new r.Buf16(l.w_size), l.lit_bufsize = 1 << s + 6, l.pending_buf_size = 4 * l.lit_bufsize, l.pending_buf = new r.Buf8(l.pending_buf_size), l.d_buf = 1 * l.lit_bufsize, l.l_buf = 3 * l.lit_bufsize, l.level = a, l.strategy = h, l.method = n, x(e)
                        }

                        function S(e, a) {
                            var r, l, u, f;
                            if (!e || !e.state || a > L || a < 0) return e ? t(e, T) : T;
                            if (l = e.state, !e.output || !e.input && 0 !== e.avail_in || l.status === ut && a !== I) return t(e, 0 === e.avail_out ? F : T);
                            if (l.strm = e, r = l.last_flush, l.last_flush = a, l.status === st)
                                if (2 === l.wrap) e.adler = 0, o(l, 31), o(l, 139), o(l, 8), l.gzhead ? (o(l, (l.gzhead.text ? 1 : 0) + (l.gzhead.hcrc ? 2 : 0) + (l.gzhead.extra ? 4 : 0) + (l.gzhead.name ? 8 : 0) + (l.gzhead.comment ? 16 : 0)), o(l, 255 & l.gzhead.time), o(l, l.gzhead.time >> 8 & 255), o(l, l.gzhead.time >> 16 & 255), o(l, l.gzhead.time >> 24 & 255), o(l, 9 === l.level ? 2 : l.strategy >= K || l.level < 2 ? 4 : 0), o(l, 255 & l.gzhead.os), l.gzhead.extra && l.gzhead.extra.length && (o(l, 255 & l.gzhead.extra.length), o(l, l.gzhead.extra.length >> 8 & 255)), l.gzhead.hcrc && (e.adler = n(e.adler, l.pending_buf, l.pending, 0)), l.gzindex = 0, l.status = ht) : (o(l, 0), o(l, 0), o(l, 0), o(l, 0), o(l, 0), o(l, 9 === l.level ? 2 : l.strategy >= K || l.level < 2 ? 4 : 0), o(l, bt), l.status = dt);
                                else {
                                    var c = R + (l.w_bits - 8 << 4) << 8,
                                        g = -1;
                                    g = l.strategy >= K || l.level < 2 ? 0 : l.level < 6 ? 1 : 6 === l.level ? 2 : 3, c |= g << 6, 0 !== l.strstart && (c |= it), c += 31 - c % 31, l.status = dt, d(l, c), 0 !== l.strstart && (d(l, e.adler >>> 16), d(l, 65535 & e.adler)), e.adler = 1
                                }
                            if (l.status === ht)
                                if (l.gzhead.extra) {
                                    for (u = l.pending; l.gzindex < (65535 & l.gzhead.extra.length) && (l.pending !== l.pending_buf_size || (l.gzhead.hcrc && l.pending > u && (e.adler = n(e.adler, l.pending_buf, l.pending - u, u)), _(e), u = l.pending, l.pending !== l.pending_buf_size));) o(l, 255 & l.gzhead.extra[l.gzindex]), l.gzindex++;
                                    l.gzhead.hcrc && l.pending > u && (e.adler = n(e.adler, l.pending_buf, l.pending - u, u)), l.gzindex === l.gzhead.extra.length && (l.gzindex = 0, l.status = _t)
                                } else l.status = _t;
                            if (l.status === _t)
                                if (l.gzhead.name) {
                                    u = l.pending;
                                    do {
                                        if (l.pending === l.pending_buf_size && (l.gzhead.hcrc && l.pending > u && (e.adler = n(e.adler, l.pending_buf, l.pending - u, u)), _(e), u = l.pending, l.pending === l.pending_buf_size)) {
                                            f = 1;
                                            break
                                        }
                                        f = l.gzindex < l.gzhead.name.length ? 255 & l.gzhead.name.charCodeAt(l.gzindex++) : 0, o(l, f)
                                    } while (0 !== f);
                                    l.gzhead.hcrc && l.pending > u && (e.adler = n(e.adler, l.pending_buf, l.pending - u, u)), 0 === f && (l.gzindex = 0, l.status = lt)
                                } else l.status = lt;
                            if (l.status === lt)
                                if (l.gzhead.comment) {
                                    u = l.pending;
                                    do {
                                        if (l.pending === l.pending_buf_size && (l.gzhead.hcrc && l.pending > u && (e.adler = n(e.adler, l.pending_buf, l.pending - u, u)), _(e), u = l.pending, l.pending === l.pending_buf_size)) {
                                            f = 1;
                                            break
                                        }
                                        f = l.gzindex < l.gzhead.comment.length ? 255 & l.gzhead.comment.charCodeAt(l.gzindex++) : 0, o(l, f)
                                    } while (0 !== f);
                                    l.gzhead.hcrc && l.pending > u && (e.adler = n(e.adler, l.pending_buf, l.pending - u, u)), 0 === f && (l.status = ot)
                                } else l.status = ot;
                            if (l.status === ot && (l.gzhead.hcrc ? (l.pending + 2 > l.pending_buf_size && _(e), l.pending + 2 <= l.pending_buf_size && (o(l, 255 & e.adler), o(l, e.adler >> 8 & 255), e.adler = 0, l.status = dt)) : l.status = dt), 0 !== l.pending) {
                                if (_(e), 0 === e.avail_out) return l.last_flush = -1, O
                            } else if (0 === e.avail_in && i(a) <= i(r) && a !== I) return t(e, F);
                            if (l.status === ut && 0 !== e.avail_in) return t(e, F);
                            if (0 !== e.avail_in || 0 !== l.lookahead || a !== U && l.status !== ut) {
                                var p = l.strategy === K ? v(l, a) : l.strategy === M ? w(l, a) : j[l.level].func(l, a);
                                if (p !== gt && p !== pt || (l.status = ut), p === ft || p === gt) return 0 === e.avail_out && (l.last_flush = -1), O;
                                if (p === ct && (a === D ? s._tr_align(l) : a !== L && (s._tr_stored_block(l, 0, 0, !1), a === H && (h(l.head), 0 === l.lookahead && (l.strstart = 0, l.block_start = 0, l.insert = 0))), _(e), 0 === e.avail_out)) return l.last_flush = -1, O
                            }
                            return a !== I ? O : l.wrap <= 0 ? P : (2 === l.wrap ? (o(l, 255 & e.adler), o(l, e.adler >> 8 & 255), o(l, e.adler >> 16 & 255), o(l, e.adler >> 24 & 255), o(l, 255 & e.total_in), o(l, e.total_in >> 8 & 255), o(l, e.total_in >> 16 & 255), o(l, e.total_in >> 24 & 255)) : (d(l, e.adler >>> 16), d(l, 65535 & e.adler)), _(e), l.wrap > 0 && (l.wrap = -l.wrap), 0 !== l.pending ? O : P)
                        }

                        function C(e) {
                            var a;
                            return e && e.state ? (a = e.state.status, a !== st && a !== ht && a !== _t && a !== lt && a !== ot && a !== dt && a !== ut ? t(e, T) : (e.state = null, a === dt ? t(e, q) : O)) : T
                        }

                        function E(t, a) {
                            var n, i, s, _, l, o, d, u, f = a.length;
                            if (!t || !t.state) return T;
                            if (n = t.state, _ = n.wrap, 2 === _ || 1 === _ && n.status !== st || n.lookahead) return T;
                            for (1 === _ && (t.adler = e(t.adler, a, f, 0)), n.wrap = 0, f >= n.w_size && (0 === _ && (h(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0), u = new r.Buf8(n.w_size), r.arraySet(u, a, f - n.w_size, n.w_size, 0), a = u, f = n.w_size), l = t.avail_in, o = t.next_in, d = t.input, t.avail_in = f, t.next_in = 0, t.input = a, c(n); n.lookahead >= at;) {
                                i = n.strstart, s = n.lookahead - (at - 1);
                                do n.ins_h = (n.ins_h << n.hash_shift ^ n.window[i + at - 1]) & n.hash_mask, n.prev[i & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = i, i++; while (--s);
                                n.strstart = i, n.lookahead = at - 1, c(n)
                            }
                            return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = at - 1, n.match_available = 0, t.next_in = o, t.input = d, t.avail_in = l, n.wrap = _, O
                        }
                        var j, U = 0,
                            D = 1,
                            H = 3,
                            I = 4,
                            L = 5,
                            O = 0,
                            P = 1,
                            T = -2,
                            q = -3,
                            F = -5,
                            G = -1,
                            J = 1,
                            K = 2,
                            M = 3,
                            N = 4,
                            Q = 2,
                            R = 8,
                            V = 9,
                            W = 29,
                            X = 256,
                            Y = X + 1 + W,
                            Z = 30,
                            $ = 19,
                            tt = 2 * Y + 1,
                            et = 15,
                            at = 3,
                            nt = 258,
                            rt = nt + at + 1,
                            it = 32,
                            st = 42,
                            ht = 69,
                            _t = 73,
                            lt = 91,
                            ot = 103,
                            dt = 113,
                            ut = 666,
                            ft = 1,
                            ct = 2,
                            gt = 3,
                            pt = 4,
                            bt = 3;
                        return j = [new m(0, 0, 0, 0, g), new m(4, 4, 8, 4, p), new m(4, 5, 16, 8, p), new m(4, 6, 32, 32, p), new m(4, 4, 16, 16, b), new m(8, 16, 32, 32, b), new m(8, 16, 128, 128, b), new m(8, 32, 128, 256, b), new m(32, 128, 258, 1024, b), new m(32, 258, 258, 4096, b)], {
                            deflateInit2: A,
                            deflateSetHeader: B,
                            deflate: S,
                            deflateEnd: C,
                            deflateSetDictionary: E
                        }
                    }(),
                    _ = function() {
                        function e(n) {
                            if (!(this instanceof e)) return new e(n);
                            this.options = r.assign({
                                level: c,
                                method: p,
                                chunkSize: 16384,
                                windowBits: 15,
                                memLevel: 8,
                                strategy: g,
                                to: ""
                            }, n || {});
                            var s = this.options;
                            s.raw && s.windowBits > 0 ? s.windowBits = -s.windowBits : s.gzip && s.windowBits > 0 && s.windowBits < 16 && (s.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new t, this.strm.avail_out = 0;
                            var l = h.deflateInit2(this.strm, s.level, s.method, s.windowBits, s.memLevel, s.strategy);
                            if (l !== d) throw new Error(a[l]);
                            if (s.header && h.deflateSetHeader(this.strm, s.header), s.dictionary) {
                                var o;
                                if (o = "string" == typeof s.dictionary ? i.string2buf(s.dictionary) : "[object ArrayBuffer]" === _.call(s.dictionary) ? new Uint8Array(s.dictionary) : s.dictionary, l = h.deflateSetDictionary(this.strm, o), l !== d) throw new Error(a[l]);
                                this._dict_set = !0
                            }
                        }

                        function n(t, n) {
                            var r = new e(n);
                            if (r.push(t, !0), r.err) throw r.msg || a[r.err];
                            return r.result
                        }

                        function s(t, e) {
                            return e = e || {}, e.gzip = !0, n(t, e)
                        }
                        var _ = Object.prototype.toString,
                            l = 0,
                            o = 4,
                            d = 0,
                            u = 1,
                            f = 2,
                            c = -1,
                            g = 0,
                            p = 8;
                        return e.prototype.push = function(t, e) {
                            var a, n, s = this.strm,
                                c = this.options.chunkSize;
                            if (this.ended) return !1;
                            n = e === ~~e ? e : e === !0 ? o : l, "string" == typeof t ? s.input = i.string2buf(t) : "[object ArrayBuffer]" === _.call(t) ? s.input = new Uint8Array(t) : s.input = t, s.next_in = 0, s.avail_in = s.input.length;
                            do {
                                if (0 === s.avail_out && (s.output = new r.Buf8(c), s.next_out = 0, s.avail_out = c), a = h.deflate(s, n), a !== u && a !== d) return this.onEnd(a), this.ended = !0, !1;
                                0 !== s.avail_out && (0 !== s.avail_in || n !== o && n !== f) || ("string" === this.options.to ? this.onData(i.buf2binstring(r.shrinkBuf(s.output, s.next_out))) : this.onData(r.shrinkBuf(s.output, s.next_out)))
                            } while ((s.avail_in > 0 || 0 === s.avail_out) && a !== u);
                            return n === o ? (a = h.deflateEnd(this.strm), this.onEnd(a), this.ended = !0, a === d) : n !== f || (this.onEnd(d), s.avail_out = 0, !0)
                        }, e.prototype.onData = function(t) {
                            this.chunks.push(t)
                        }, e.prototype.onEnd = function(t) {
                            t === d && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = r.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg
                        }, {
                            gzip: s
                        }
                    }();
                return _
            }();
        }
        return {
            config: _215,
            start: _78,
            stop: _58,
            newPageView: _332,
            stopSession: _334,
            rebindEventHandlers: _320,
            getSessionId: function() {
                return _4._20
            },
            getPageViewId: function() {
                return _4._56
            },
            tag: _117,
            star: _316,
            setVariable: _220,
            identify: _307,
            formSubmitAttempt: _223,
            formSubmitSuccess: _183,
            formSubmitFailure: _306,
            debug: function() {
                _13.debug = !_13.debug;
                console.log("MF: Debugging " + (_13.debug ? "enabled" : "disabled"))
            },
            isRecording: function() {
                return _82
            },
            isReturningUser: function() {
                return _4._97
            },
            activateFeedback: _85._305,
            websiteId: _45,
            recordingRate: _185,
            version: _169
        }
    })(window, Math)
}