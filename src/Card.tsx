import { AnimatePresence, motion } from "framer-motion";
import type { Entry } from "./App";
type PropTypes = {
  onClick: ((value: Entry) => void) | undefined;
  complete: boolean;
  selected: boolean;
  entry: Entry;
};
export function Card({ onClick, entry, selected, complete }: PropTypes) {
  return (
    <motion.div
      initial={false}
      animate={{ rotateY: selected ? 0 : complete ? 0 : 180 }}
      transition={{ duration: 0.5 }}
      onClick={onClick ? () => onClick(entry) : undefined}
      className="game-card"
      data-complete={complete}
    >
      <AnimatePresence>
        {(selected || complete) && (
          <motion.img
            key={`${entry.value}-${entry.y}-${entry.x}`}
            exit={{ opacity: 0, transition: { duration: 0.25, delay: 0 } }}
            src={`/${entry.value}.webp`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.25 }}
            width={"100%"}
            height={"100%"}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
